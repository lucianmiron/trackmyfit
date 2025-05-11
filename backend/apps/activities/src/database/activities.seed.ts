import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Activity } from '../entities/activity.entity';
import { ExerciseSet, WeightUnit } from '../entities/exercise-set.entity';
import { Exercise } from '../entities/exercise.entity';

@Injectable()
export class ActivitiesSeeder {
  constructor(private dataSource: DataSource) {}

  async seed() {
    const activitiesRepository = this.dataSource.getRepository(Activity);

    let activities: Activity[] = [];

    let activity;
    let exercise;
    let set;

    // Create a new activity: Chest #1
    {
      activity = new Activity();
      activity.name = 'Chest';
      activity.userId = 1;
      activity.startDate = new Date('2025-05-04');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Incline Chest Press';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 10;
      set.weight = 55;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 7;
      set.weight = 55;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 7;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Seated Chest Press (rotating)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 7;
      set.weight = 95;
      set.unit = WeightUnit.KG;
      set.duration = 35;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 7;
      set.weight = 85;
      set.unit = WeightUnit.KG;
      set.duration = 35;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 5;
      set.weight = 85;
      set.unit = WeightUnit.KG;
      set.duration = 35;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Chest Fly (2)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 9;
      set.weight = 43;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 7;
      set.weight = 43;
      set.unit = WeightUnit.KG;
      set.duration = 46;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 5;
      set.weight = 43;
      set.unit = WeightUnit.KG;
      set.duration = 46;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'M-Torture Wide Chest Press';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 5;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 9;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 8;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 38;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Seated Chest Press (mirror)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 8;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 7;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 6;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 30;
      exercise.sets.push(set);
    }

    // Create a new activity: Chest #2
    {
      activity = new Activity();
      activity.name = 'Chest';
      activity.userId = 1;
      activity.startDate = new Date('2025-05-10');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Incline Chest Press';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 7;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 5;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 6;
      set.weight = 55;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'M-Torture Wide Chest Press';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 8;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 6;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 6;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Chest Fly';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 5;
      set.weight = 45;
      set.unit = WeightUnit.KG;
      set.duration = 30;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 5;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 8;
      set.weight = 30;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Seated Chest Press (mirror)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 9;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 48;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 6;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 35;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 9;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);
    }

    await activitiesRepository.save(activities);
  }
}
