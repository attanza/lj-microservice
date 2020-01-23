import { Module } from '@nestjs/common';
import { ReferralModule } from '../referral/referral.module';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [ReferralModule],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
