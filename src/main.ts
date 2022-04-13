import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configservice=app.get(ConfigService)
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', './src/public'));
  app.setBaseViewsDir(join(__dirname, '..', './src/views'));
  app.setViewEngine('hbs');

  await app.listen(configservice.get('APP_PORT'));
}
bootstrap();
