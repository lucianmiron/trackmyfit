import { NestFactory } from '@nestjs/core';
import { ActivitiesModule } from './activities.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ActivitiesModule);
  const configService = app.get(ConfigService); // Retrieve the injectable ConfigService
  await app.listen(configService.get('PORT'));
}
bootstrap();
