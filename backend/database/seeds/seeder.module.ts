import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSeeder } from 'apps/auth/src/database/seeds/user.seed';
import { User } from '@app/common/database/entities';
import { Seeder } from './seed.service';
import * as Joi from 'joi';
import { Activity } from 'apps/activities/src/entities/activity.entity';
import { Exercise } from 'apps/activities/src/entities/exercise.entity';
import { ExerciseSet } from 'apps/activities/src/entities/exercise-set.entity';
import { ActivitiesSeeder } from 'apps/activities/src/database/activities.seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './database/.env.local',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true, //configService.get('NODE_ENV') === 'development', // Set to false in production
        logging: configService.get('NODE_ENV') === 'development', // Enable logging in development
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Activity, Exercise, ExerciseSet]),
  ],
  providers: [Seeder, UserSeeder, ActivitiesSeeder /* other seeders */],
})
export class SeederModule {}
