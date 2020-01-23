import { Injectable } from '@nestjs/common';
import Chance from 'chance';
import moment from 'moment';
import { CreateRefferalDto } from 'src/referral/referral.dto';
import { ReferralService } from '../referral/referral.service';
@Injectable()
export class SeederService {
  constructor(private refferalService: ReferralService) {}

  async seedRefferal() {
    for (let i = 0; i < 25; i++) {
      const data: CreateRefferalDto = this.getRefferalData();
      await this.refferalService.store(data);
    }
  }

  private getRefferalData(): CreateRefferalDto {
    const faker = new Chance();
    const now = moment();
    const tommorow = now.add(1, 'days').toDate();
    return {
      code: faker.bb_pin(),
      description: faker.sentence(),
      creator: {
        id: faker.bb_pin(),
        email: faker.email(),
      },
      maxConsumer: 1,
      products: [{ id: faker.bb_pin(), name: faker.word() }],
      validUntil: tommorow,
    };
  }
}
