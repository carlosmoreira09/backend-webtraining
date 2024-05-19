import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetsEntity } from './sheets.entity';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { ExercisesService } from '../exercises/exercises.service';
import { ClientsService } from '../clients/clients.service';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { ClientsEntity } from '../clients/clients.entity';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SheetsEntity,
      ExercisesEntity,
      ClientsEntity,
      UsersEntity,
    ]),
  ],
  controllers: [SheetsController],
  providers: [SheetsService, ExercisesService, ClientsService, UsersService],
})
export class SheetsModule {}
