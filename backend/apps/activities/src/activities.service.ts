import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Exercise } from './entities/exercise.entity';
import { ExerciseSet } from './entities/exercise-set.entity';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import {
  PerformanceResponse,
  PerformancePoint,
} from './dto/performance-response.dto';
import { PerformanceParamsDto } from './dto/performance-params.dto';

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

  async calculatePerformance(
    userId: number,
    params: PerformanceParamsDto,
  ): Promise<PerformanceResponse[]> {
    // Default weights if not provided
    const volumeWeight =
      params.volumeWeight !== undefined ? params.volumeWeight / 100 : 0.6;
    const durationWeight =
      params.durationWeight !== undefined ? params.durationWeight / 100 : 0.3;
    const fatigueWeight =
      params.fatigueWeight !== undefined ? params.fatigueWeight / 100 : 0.1;

    // Normalize weights to ensure they sum to 1
    const totalWeight = volumeWeight + durationWeight + fatigueWeight;
    const normalizedVolumeWeight = volumeWeight / totalWeight;
    const normalizedDurationWeight = durationWeight / totalWeight;
    const normalizedFatigueWeight = fatigueWeight / totalWeight;

    // Default fatigue model
    const fatigueModel = params.fatigueModel || 'position';

    // Fetch all user activities
    const activities = await this.activityRepository.find({
      where: { userId },
      relations: {
        exercises: {
          sets: true,
        },
      },
      order: { startDate: 'ASC' },
    });

    // Filter activities if activityName is provided
    const filteredActivities = params.activityName
      ? activities.filter((a) => a.name === params.activityName)
      : activities;

    // Group exercises across activities
    const exerciseGroups: Record<
      string,
      {
        activity: Activity;
        exercise: Exercise;
        activityExerciseIndex: number;
      }[]
    > = {};

    filteredActivities.forEach((activity) => {
      activity.exercises.forEach((exercise, index) => {
        if (!exerciseGroups[exercise.name]) {
          exerciseGroups[exercise.name] = [];
        }
        exerciseGroups[exercise.name].push({
          activity,
          exercise,
          activityExerciseIndex: index,
        });
      });
    });

    // Filter exercise groups if exerciseName is provided
    const filteredExerciseNames = params.exerciseName
      ? [params.exerciseName]
      : Object.keys(exerciseGroups);

    // TODO resume reading: Calculate performance for each exercise over time
    const result: PerformanceResponse[] = [];

    for (const exerciseName of filteredExerciseNames) {
      if (!exerciseGroups[exerciseName]) continue;

      const exerciseInstances = exerciseGroups[exerciseName];
      const performanceData: PerformancePoint[] = [];

      for (const {
        activity,
        exercise,
        activityExerciseIndex,
      } of exerciseInstances) {
        // Calculate fatigue factor based on the selected model
        let fatigueFactor = 0;

        switch (fatigueModel) {
          case 'position':
            // Simple position-based approach: 0 = first exercise, 1 = last exercise
            fatigueFactor =
              activity.exercises.length > 1
                ? activityExerciseIndex / (activity.exercises.length - 1)
                : 0;
            break;

          case 'time':
            // Time-based approach: Consider when during the workout the exercise was performed
            // We'll estimate based on the cumulative duration of previous exercises
            let totalDurationBefore = 0;
            for (let i = 0; i < activityExerciseIndex; i++) {
              activity.exercises[i].sets.forEach((set) => {
                totalDurationBefore += set.duration;
              });
            }

            let totalWorkoutDuration = 0;
            activity.exercises.forEach((ex) => {
              ex.sets.forEach((set) => {
                totalWorkoutDuration += set.duration;
              });
            });

            fatigueFactor =
              totalWorkoutDuration > 0
                ? totalDurationBefore / totalWorkoutDuration
                : 0;
            break;

          case 'complex':
            // Complex approach: Combine position and estimated metabolic fatigue
            // Position component
            const positionFactor =
              activity.exercises.length > 1
                ? activityExerciseIndex / (activity.exercises.length - 1)
                : 0;

            // Metabolic component: Estimate based on volume of previous exercises
            // (assumes greater volume = greater fatigue)
            let volumeBefore = 0;
            for (let i = 0; i < activityExerciseIndex; i++) {
              activity.exercises[i].sets.forEach((set) => {
                volumeBefore += set.reps * set.weight;
              });
            }

            // Scale the metabolic factor from 0-1 based on a reasonable max volume
            // Assuming 5000 is a high total volume for exercises before this one
            const metabolicFactor = Math.min(volumeBefore / 5000, 1);

            // Combine factors (60% position, 40% metabolic)
            fatigueFactor = positionFactor * 0.6 + metabolicFactor * 0.4;
            break;

          default:
            // Default to position-based approach
            fatigueFactor =
              activity.exercises.length > 1
                ? activityExerciseIndex / (activity.exercises.length - 1)
                : 0;
        }

        // Calculate total volume and duration
        let totalVolume = 0;
        let totalDuration = 0;

        exercise.sets.forEach((set) => {
          // Volume = weight * reps
          totalVolume += set.weight * set.reps;
          totalDuration += set.duration;
        });

        // Calculate raw component scores
        const volumeScore = totalVolume;

        // Duration efficiency - higher score for more volume in less time
        // We use a logarithmic scale to prevent extreme values
        const durationEfficiency =
          totalVolume > 0 && totalDuration > 0
            ? Math.log(totalVolume / totalDuration) + 10 // +10 to keep values positive
            : 0;

        // Adjust for fatigue (higher performance when fatigue is high)
        const fatigueAdjustment = (1 + fatigueFactor) * 10; // Scale for visibility

        // Calculate raw performance score
        const rawPerformance =
          volumeScore * normalizedVolumeWeight +
          durationEfficiency * normalizedDurationWeight +
          fatigueAdjustment * normalizedFatigueWeight;

        // Store raw performance data with component values for detailed analysis
        performanceData.push({
          date: activity.startDate.toISOString(),
          performance: Number(rawPerformance.toFixed(2)),
          volume: totalVolume,
          durationEfficiency,
          fatigueLevel: fatigueFactor,
          exerciseName: exercise.name,
          rawPerformance, // Store non-normalized value
        });
      }

      // Sort by date
      performanceData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      // Find the most frequent activity name for this exercise
      const activityCounts: Record<string, number> = {};
      exerciseInstances.forEach(({ activity }) => {
        activityCounts[activity.name] =
          (activityCounts[activity.name] || 0) + 1;
      });

      const primaryActivityName = Object.entries(activityCounts).sort(
        (a, b) => b[1] - a[1],
      )[0][0];

      // Store baseline performance for percentage calculations
      const baselinePerformance =
        performanceData.length > 0 ? performanceData[0].performance : undefined;

      result.push({
        activityName: primaryActivityName,
        exerciseName,
        performanceData,
        baselinePerformance,
      });
    }

    return result;
  }
}
