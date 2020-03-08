import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from './activity/activity.module';
import { ReferralModule } from './referral/referral.module';
import { SeederModule } from './seeder/seeder.module';

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI + process.env.DB_NAME,
      MONGO_OPTIONS,
    ),
    ReferralModule,
    SeederModule,
    ActivityModule,
  ],
})
export class AppModule { }
