import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesEntity } from './exercises.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { ClientsService } from '../clients/clients.service';
import { ClientsEntity } from '../clients/clients.entity';
import { AuthService } from '../auth/auth.service';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExercisesEntity, ClientsEntity, UsersEntity]),
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService, ClientsService, UsersService],
})
export class ExercisesModule {}
