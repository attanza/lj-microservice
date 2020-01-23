import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferralModule } from './referral/refferal.module';
import { SeederModule } from './seeder/seeder.module';

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, MONGO_OPTIONS),
    ReferralModule,
    SeederModule,
  ],
})
export class AppModule {}
