import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferralController } from './refferal.controller';
import { RefferalSchema } from './refferal.schema';
import { ReferralService } from './refferal.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Refferal', schema: RefferalSchema }]),
  ],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [ReferralService],
})
export class ReferralModule {}
