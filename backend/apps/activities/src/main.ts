import { NestFactory } from '@nestjs/core';
import { ActivitiesModule } from './activities.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ActivitiesModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  // Set up global prefix for all routes
  // app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: '*',
  });

  const configService = app.get(ConfigService); // Retrieve the injectable ConfigService
  await app.listen(configService.get('PORT'));
}
bootstrap();
