import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Activity } from './activity.entity';
import { ExerciseSet } from './exercise-set.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Activity, (activity) => activity.exercises)
  activity: Activity;

  @OneToMany(() => ExerciseSet, (set) => set.exercise, {
    cascade: true,
    eager: true,
  })
  sets: ExerciseSet[];
}
