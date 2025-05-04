import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exercise } from './exercise.entity';

export enum WeightUnit {
  KG = 'kg',
  LB = 'lb',
}

@Entity()
export class ExerciseSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setNumber: number;

  @Column()
  reps: number;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Column({
    type: 'enum',
    enum: WeightUnit,
    default: WeightUnit.KG,
  })
  unit: WeightUnit;

  @Column()
  duration: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.sets)
  exercise: Exercise;
}
