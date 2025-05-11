import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PerformanceParamsDto {
  @IsString()
  @IsOptional()
  activityName?: string;

  @IsString()
  @IsOptional()
  exerciseName?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  volumeWeight?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  durationWeight?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  fatigueWeight?: number;

  @IsString()
  @IsOptional()
  fatigueModel?: 'position' | 'time' | 'heartRate' | 'complex';
}
