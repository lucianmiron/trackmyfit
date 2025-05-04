import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  duration: number;

  @CreateDateColumn()
  startDate: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.activity, {
    cascade: true,
    eager: true,
  })
  exercises: Exercise[];
}
