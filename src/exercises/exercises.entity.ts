import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'exercises' })
export class ExercisesEntity {
  @PrimaryGeneratedColumn()
  id_exercise: number;

  @Column()
  exercise: string;

  @ManyToOne(() => UsersEntity, (users) => users.id_user)
  @JoinColumn()
  admin: UsersEntity;

  @Column()
  repetition: string;

  @Column()
  exercise_desc: string;

  @Column({
    default: null,
  })
  videoName?: string;

  @Column()
  exercise_type: string;
}
