import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateExerciseDto } from './create-exercise-set.dto';
import { Type } from 'class-transformer';

export class CreateActivityDto {
  @IsString()
  @MinLength(2, { message: 'Name is too short' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNumber()
  duration: number;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}
