import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferralController } from './referral.controller';
import { RefferalSchema } from './referral.schema';
import { ReferralService } from './referral.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Refferal', schema: RefferalSchema }]),
  ],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [ReferralService],
})
export class ReferralModule {}
