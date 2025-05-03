import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @MinLength(2, { message: 'Name is too short' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
