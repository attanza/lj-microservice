import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/http-exception.filter';

async function bootstrap() {
  try {
    const port = process.env.APP_PORT;
    const app = await NestFactory.create(AppModule);
    app.use(helmet.default());
    app.enableCors();
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.listen(port);
    Logger.log(`Server running at http://localhost:${port}`, 'Bootstrap');
  } catch (e) {
    console.error(e);
  }
}
bootstrap();
