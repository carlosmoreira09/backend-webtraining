import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { ExercisesEntity } from '../exercises/exercises.entity';
@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  user: string;

  @Column()
  nome: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => ExercisesEntity, (exercise) => exercise.user)
  @JoinColumn()
  listExercises: ExercisesEntity;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  updatedAt?: Timestamp;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt?: Timestamp;
}
