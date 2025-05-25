import { NestFactory } from '@nestjs/core';
import { ActivitiesModule } from './activities.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ActivitiesModule);

  // Set global prefix for all routes
  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://34.160.170.6',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
