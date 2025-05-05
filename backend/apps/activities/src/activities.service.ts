import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Exercise } from './entities/exercise.entity';
import { ExerciseSet } from './entities/exercise-set.entity';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async create(
    activityDto: CreateActivityDto,
    userId: number,
  ): Promise<Activity> {
    const activity = new Activity();
    activity.name = activityDto.name;
    activity.duration = activityDto.duration;
    activity.userId = userId;

    // Create exercises with their sets - cascading will handle the saving
    activity.exercises = activityDto.exercises.map((exerciseDto) => {
      const exercise = new Exercise();
      exercise.name = exerciseDto.name;

      exercise.sets = exerciseDto.sets.map((setDto) => {
        const set = new ExerciseSet();
        set.setNumber = setDto.setNumber;
        set.reps = setDto.reps;
        set.weight = setDto.weight;
        set.unit = setDto.unit;
        set.duration = setDto.duration;
        return set;
      });

      return exercise;
    });

    return this.activityRepository.save(activity);
  }

  async findAll(userId: number): Promise<Activity[]> {
    return this.activityRepository.find({
      where: { userId },
      relations: {
        exercises: {
          sets: true,
        },
      },
    });
  }

  async findOne(id: number, userId: number): Promise<Activity> {
    return this.activityRepository.findOne({
      where: { id, userId },
      relations: {
        exercises: {
          sets: true,
        },
      },
    });
  }
}
