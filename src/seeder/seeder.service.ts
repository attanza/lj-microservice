import { Injectable } from '@nestjs/common';
import Chance from 'chance';
import moment from 'moment';
import { CreateReferralDto } from 'src/referral/referral.dto';
import { ReferralService } from '../referral/referral.service';
@Injectable()
export class SeederService {
  constructor(private referralService: ReferralService) {}

  async seedReferral() {
    for (let i = 0; i < 25; i++) {
      const data: CreateReferralDto = this.getReferralData();
      await this.referralService.store(data);
    }
  }

  private getReferralData(): CreateReferralDto {
    const faker = new Chance();
    const now = moment();
    const tomorrow = now.add(1, 'days').toDate();
    return {
      code: faker.bb_pin(),
      description: faker.sentence(),
      creator: {
        id: faker.bb_pin(),
        email: faker.email(),
      },
      maxConsumer: 1,
      products: [{ id: faker.bb_pin(), name: faker.word() }],
      validUntil: tomorrow,
    };
  }
}
