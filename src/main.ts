import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
async function bootstrap() {
  const port = process.env.APP_PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Server running at http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
