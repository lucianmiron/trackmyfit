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

    //start
    // First, get a complete list of all unique exercises across all activities
    const allExerciseNames = new Set<string>();
    filteredActivities.forEach((activity) => {
      activity.exercises.forEach((exercise) => {
        allExerciseNames.add(exercise.name);
      });
    });

    // Create result array to hold all exercises
    const result: PerformanceResponse[] = [];

    // For each exercise name, process its performance data
    for (const exerciseName of Array.from(allExerciseNames)) {
      // Skip if this exercise was filtered out
      if (params.exerciseName && params.exerciseName !== exerciseName) continue;

      // Get all instances of this exercise across activities
      const exerciseInstances: {
        activity: Activity;
        exercise: Exercise;
        activityExerciseIndex: number;
      }[] = [];

      filteredActivities.forEach((activity) => {
        const index = activity.exercises.findIndex(
          (ex) => ex.name === exerciseName,
        );
        if (index !== -1) {
          exerciseInstances.push({
            activity,
            exercise: activity.exercises[index],
            activityExerciseIndex: index,
          });
        }
      });

      // Skip if no instances found (shouldn't happen but just in case)
      if (exerciseInstances.length === 0) continue;

      // Process performance data for this exercise
      const performanceData: PerformancePoint[] = [];

      // Create a sorted list of all activity dates
      const activityDates = filteredActivities
        .map((a) => a.startDate)
        .sort((a, b) => a.getTime() - b.getTime());

      // Get the earliest date (for baseline calculation)
      const earliestDate = activityDates[0];
      // end

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
          exerciseName,
          rawPerformance,
        });
      }

      // Sort by date
      performanceData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      // Find primary activity name
      const activityCounts: Record<string, number> = {};
      exerciseInstances.forEach(({ activity }) => {
        activityCounts[activity.name] =
          (activityCounts[activity.name] || 0) + 1;
      });

      const primaryActivityName = Object.entries(activityCounts).sort(
        (a, b) => b[1] - a[1],
      )[0][0];

      // Calculate baseline - all data will be relative to the first exercise data point
      const baselinePerformance =
        performanceData.length > 0 ? performanceData[0].performance : undefined;

      // Add to result
      result.push({
        activityName: primaryActivityName,
        exerciseName,
        performanceData,
        baselinePerformance,
      });
    }

    // Ensure all exercises have data points for all activity dates
    const activityDates = filteredActivities
      .map((a) => a.startDate.toISOString())
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    // For data visualization consistency, ensure each exercise has a data point for all dates
    result.forEach((exerciseResult) => {
      // Create a map of existing dates
      const existingDates = new Set(
        exerciseResult.performanceData.map((point) => point.date),
      );

      // Ensure baseline performance is properly set
      if (exerciseResult.performanceData.length > 0) {
        // Sort performance data by date to ensure the first entry is the earliest
        exerciseResult.performanceData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        exerciseResult.baselinePerformance =
          exerciseResult.performanceData[0].performance;
      }

      // For each activity date, ensure there is a data point
      activityDates.forEach((date) => {
        if (!existingDates.has(date)) {
          // Find the closest previous date with data
          const previousDates = exerciseResult.performanceData
            .filter(
              (p) => new Date(p.date).getTime() <= new Date(date).getTime(),
            )
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            );

          // If we have a previous date, use its data as reference
          if (previousDates.length > 0) {
            const reference = previousDates[0];

            // Create a synthetic data point
            const syntheticPoint: PerformancePoint = {
              date: date,
              performance: reference.performance,
              volume: reference.volume,
              durationEfficiency: reference.durationEfficiency,
              fatigueLevel: reference.fatigueLevel,
              exerciseName: exerciseResult.exerciseName,
              rawPerformance: reference.rawPerformance,
            };

            exerciseResult.performanceData.push(syntheticPoint);
          }
        }
      });

      // Sort the performance data by date
      exerciseResult.performanceData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    });

    return result;
  }
}
