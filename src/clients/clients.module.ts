import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from './clients.entity';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientsEntity, UsersEntity])],
  controllers: [ClientsController],
  providers: [ClientsService, UsersService],
})
export class ClientsModule {}
