import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeds/seeder.module';
import { Seeder } from './seeds/seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seeder = appContext.get(Seeder);

  try {
    await seeder.seed();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding failed', error);
  } finally {
    await appContext.close();
  }
}

bootstrap();
