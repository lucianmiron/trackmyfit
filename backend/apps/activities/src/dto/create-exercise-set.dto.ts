import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsEnum,
  IsDefined,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// TODO: refactor this type to be used on frontend and backend
enum WeightUnit {
  KG = 'kg',
  LB = 'lb',
}

export class ExerciseSetDto {
  @IsNumber()
  @Min(1)
  setNumber: number;

  @IsNumber()
  reps: number;

  @IsNumber()
  weight: number;

  @IsEnum(WeightUnit)
  unit: WeightUnit;

  @IsNumber()
  duration: number;
}

export class CreateExerciseDto {
  @IsString()
  @MinLength(2, { message: 'Name is too short' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ExerciseSetDto)
  sets: ExerciseSetDto[];
}
