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

    // Create a new activity: Chest #0
    {
      activity = new Activity();
      activity.name = 'Chest';
      activity.userId = 1;
      activity.startDate = new Date('2025-04-17');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
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
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 6;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 6;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
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
      set.reps = 12;
      set.weight = 35;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 9;
      set.weight = 45;
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
      set.reps = 6;
      set.weight = 70;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 60;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 5;
      set.weight = 60;
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
      set.reps = 8;
      set.weight = 87;
      set.unit = WeightUnit.KG;
      set.duration = 35;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 7;
      set.weight = 87;
      set.unit = WeightUnit.KG;
      set.duration = 35;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 6;
      set.weight = 87;
      set.unit = WeightUnit.KG;
      set.duration = 35;
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
      set.reps = 4;
      set.weight = 60;
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
      set.setNumber = 2;
      set.reps = 7;
      set.weight = 55;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
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
      set.setNumber = 2;
      set.reps = 7;
      set.weight = 85;
      set.unit = WeightUnit.KG;
      set.duration = 35;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
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
      set.setNumber = 2;
      set.reps = 7;
      set.weight = 43;
      set.unit = WeightUnit.KG;
      set.duration = 46;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
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

    // Create a new activity: Shoulders #1
    {
      activity = new Activity();
      activity.name = 'Shoulders';
      activity.userId = 1;
      activity.startDate = new Date('2025-04-18');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#1)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 12;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 10;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 8;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#2)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 9;
      set.weight = 36;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 10;
      set.weight = 34;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 10;
      set.weight = 34;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);
    }

    // Create a new activity: Shoulders #2
    {
      activity = new Activity();
      activity.name = 'Shoulders';
      activity.userId = 1;
      activity.startDate = new Date('2025-05-01');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#1)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 10;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 5;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 7;
      set.weight = 45;
      set.unit = WeightUnit.KG;
      set.duration = 45;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#2)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 6;
      set.weight = 36;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 7;
      set.weight = 32.5;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 7;
      set.weight = 30;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Biceps (1-hand)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 12;
      set.weight = 7.5;
      set.unit = WeightUnit.KG;
      set.duration = 60;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 5;
      set.weight = 7.5;
      set.unit = WeightUnit.KG;
      set.duration = 30;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 9;
      set.weight = 5;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new activity: Shoulders #3
    {
      activity = new Activity();
      activity.name = 'Shoulders';
      activity.userId = 1;
      activity.startDate = new Date('2025-05-07');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Lateral Raises (seated)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 10;
      set.weight = 10;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 5;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#1)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 6;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 0;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 45;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 6;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 4;
      set.reps = 8;
      set.weight = 30;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#3)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 10;
      set.weight = 30;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 6;
      set.weight = 30;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 11;
      set.weight = 20;
      set.unit = WeightUnit.KG;
      set.duration = 60;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#2)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 6;
      set.weight = 32.5;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 9;
      set.weight = 28;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 9;
      set.weight = 25.5;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);
    }

    // Create a new activity: Shoulders #4
    {
      activity = new Activity();
      activity.name = 'Shoulders';
      activity.userId = 1;
      activity.startDate = new Date('2025-05-12');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#2)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 12;
      set.weight = 36;
      set.unit = WeightUnit.KG;
      set.duration = 53;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 6;
      set.weight = 41;
      set.unit = WeightUnit.KG;
      set.duration = 38;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 7;
      set.weight = 36;
      set.unit = WeightUnit.KG;
      set.duration = 45;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Lateral Raises (seated)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 11;
      set.weight = 10;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 10;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 7;
      set.weight = 10;
      set.unit = WeightUnit.KG;
      set.duration = 36;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#3)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 6;
      set.weight = 50;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 7;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 45;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 5;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Shoulders Over Head (#1)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 7;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 6;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 45;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 6;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Biceps (1-hand)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 10;
      set.weight = 7.5;
      set.unit = WeightUnit.KG;
      set.duration = 60;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 5;
      set.weight = 7.5;
      set.unit = WeightUnit.KG;
      set.duration = 38;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 8;
      set.weight = 5;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 4;
      set.reps = 7;
      set.weight = 5;
      set.unit = WeightUnit.KG;
      set.duration = 44;
      exercise.sets.push(set);
    }

    // Create a new activity: Back #1
    {
      activity = new Activity();
      activity.name = 'Back';
      activity.userId = 1;
      activity.startDate = new Date('2025-05-09');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Lat Pulldown (2hands)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 10;
      set.weight = 57;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 57;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 8;
      set.weight = 57;
      set.unit = WeightUnit.KG;
      set.duration = 35;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Lat Pulldown (1hand)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 5;
      set.weight = 30;
      set.unit = WeightUnit.KG;
      set.duration = 30;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 7;
      set.weight = 25;
      set.unit = WeightUnit.KG;
      set.duration = 45;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 9;
      set.weight = 22.5;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Nautilus Lat Pullover';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 8;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 8;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Back Fly';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 8;
      set.weight = 25;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 25;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 8;
      set.weight = 20;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Calves (sitting)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 15;
      set.weight = 45;
      set.unit = WeightUnit.KG;
      set.duration = 60;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 12;
      set.weight = 45;
      set.unit = WeightUnit.KG;
      set.duration = 60;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 10;
      set.weight = 45;
      set.unit = WeightUnit.KG;
      set.duration = 50;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 4;
      set.reps = 10;
      set.weight = 45;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new activity: Quads #1
    {
      activity = new Activity();
      activity.name = 'Quads';
      activity.userId = 1;
      activity.startDate = new Date('2025-04-30');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Leg Press';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 12;
      set.weight = 100;
      set.unit = WeightUnit.KG;
      set.duration = 54;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 12;
      set.weight = 100;
      set.unit = WeightUnit.KG;
      set.duration = 60;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 12;
      set.weight = 100;
      set.unit = WeightUnit.KG;
      set.duration = 60;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Leg Extension';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 10;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 10;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 10;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    // Create a new activity: Quads #2
    {
      activity = new Activity();
      activity.name = 'Quads';
      activity.userId = 1;
      activity.startDate = new Date('2025-05-06');
      activity.duration = 0;
      activity.exercises = [];
      activities.push(activity);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Leg Press';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 12;
      set.weight = 110;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 8;
      set.weight = 110;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 12;
      set.weight = 100;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Leg Extension';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 12;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 11;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 9;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);
    }

    // Create a new exercise
    {
      exercise = new Exercise();
      exercise.name = 'Calves (sitting)';
      exercise.sets = [];
      activity.exercises.push(exercise);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 1;
      set.reps = 14;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 2;
      set.reps = 12;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 55;
      exercise.sets.push(set);

      // Create a new set
      set = new ExerciseSet();
      set.setNumber = 3;
      set.reps = 10;
      set.weight = 40;
      set.unit = WeightUnit.KG;
      set.duration = 40;
      exercise.sets.push(set);
    }

    await activitiesRepository.save(activities);
  }
}
