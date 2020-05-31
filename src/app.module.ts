import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ActivityModule } from './activity/activity.module';
import { ReferralModule } from './referral/referral.module';
import { SeederModule } from './seeder/seeder.module';
import { CronService } from './cron/cron.service';

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
    ScheduleModule.forRoot(),
    ReferralModule,
    SeederModule,
    ActivityModule,
  ],
  providers: [CronService],
})
export class AppModule {}
