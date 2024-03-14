import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'exercises' })
export class ExercisesEntity {
  @PrimaryGeneratedColumn()
  id_exercise: number;

  @Column()
  exercise: string;

  @Column()
  repetition: string;

  @Column()
  exercise_desc: string;

  @Column()
  exercise_type: string;

  @Column()
  training_type: string;

  @OneToOne(() => UsersEntity, (user) => user.listExercises)
  user: UsersEntity;
}
