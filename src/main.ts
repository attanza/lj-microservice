import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/http-exception.filter';

async function bootstrap() {
  const port = process.env.APP_PORT;
  const app = await NestFactory.create(AppModule);
  app.use(helmet.default());
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.use(
  //   rateLimit.default({
  //     windowMs: 60 * 1000 * 10, // 15 minutes
  //     max: 50, // limit each IP to 100 requests per windowMs
  //   }),
  // );
  await app.listen(port);
  Logger.log(`Server running at http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
