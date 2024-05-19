import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesEntity } from './exercises.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { ClientsService } from '../clients/clients.service';
import { ClientsEntity } from '../clients/clients.entity';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExercisesEntity, ClientsEntity, UsersEntity]),
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService, ClientsService, UsersService],
})
export class ExercisesModule {}
