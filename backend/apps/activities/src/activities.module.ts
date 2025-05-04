import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { Activity } from './entities/activity.entity';
import { Exercise } from './entities/exercise.entity';
import { ExerciseSet } from './entities/exercise-set.entity';
import { ActivityConfigModule } from './modules/config.module';

@Module({
  imports: [
    ActivityConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([Activity, Exercise, ExerciseSet]),
    LoggerModule,
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
