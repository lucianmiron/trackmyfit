export interface PerformancePoint {
  date: string;
  performance: number;
  volume: number; // Raw volume data
  durationEfficiency: number; // Raw efficiency data
  fatigueLevel: number; // Raw fatigue data
  exerciseName: string;
  rawPerformance: number; // Non-normalized performance
}

export interface PerformanceResponse {
  activityName: string;
  exerciseName: string;
  performanceData: PerformancePoint[];
  baselinePerformance?: number; // First performance value for percentage calculations
}
