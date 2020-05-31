import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import moment from 'moment';
import mqttHandler from '../helpers/mqttHandler';
import { ReferralService } from '../referral/referral.service';
@Injectable()
export class CronService {
  constructor(private readonly referralService: ReferralService) {}
  private readonly logger = new Logger('Cron');
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    this.logger.debug('Start checking expired Referral');
    const referrals = await this.referralService.getNotExpiredReferral();
    if (referrals.length > 0) {
      Promise.all(
        referrals.map(referral => {
          const now = moment();
          const expiry = moment(referral.validUntil);
          if (now >= expiry) {
            referral.isExpired = true;
          }
          if (
            referral.maxConsumer &&
            referral.maxConsumer !== 0 &&
            referral.consumer
          ) {
            if (referral.consumer.length >= referral.maxConsumer) {
              referral.isExpired = true;
            }
          }
          referral.save();
        }),
      );
      mqttHandler.sendMessage('referral/checkExpiry', 'referral/checkExpiry');
    }
    this.logger.debug('Checking expired Referral done!');
  }
}
