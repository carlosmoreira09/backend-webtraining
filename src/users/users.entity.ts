import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt?: Date;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
  })
  createdAt?: Date;
}
