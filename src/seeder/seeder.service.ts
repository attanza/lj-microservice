import { Injectable, Logger } from '@nestjs/common';
import Chance from 'chance';
import moment from 'moment';
import { CreateReferralDto } from 'src/referral/referral.dto';
import { IUser } from 'src/referral/referral.interface';
import { ReferralService } from '../referral/referral.service';
@Injectable()
export class SeederService {
  constructor(private referralService: ReferralService) {}

  async seedReferral() {
    Logger.log('Seeding Referral');
    await this.referralService.truncate();
    for (let i = 0; i < 50; i++) {
      const data: CreateReferralDto = this.getReferralData();
      await this.referralService.store(data);
    }
    Logger.log('Seeding Referral finished');
  }

  private getReferralData(): CreateReferralDto {
    const faker = new Chance();
    const now = moment();
    const tomorrow = now.add(1, 'days').toDate();
    const consumer: IUser[] = []
    for (let i = 0; i < faker.integer({min: 2, max: 7}); i++) {
      consumer.push({
        id: faker.bb_pin(),
        email: faker.email(),
        date: moment(faker.date({year: 2020, string: true})).toDate()
      })
    }
    return {
      code: faker.bb_pin(),
      description: faker.sentence(),
      creator: {
        id: faker.integer({min: 6, max: 8}).toString(),
        email: faker.email(),
      },
      consumer,
      validUntil: tomorrow
    };
  }
}
