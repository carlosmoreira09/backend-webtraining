import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ClientsEntity } from '../clients/clients.entity';
import { ClientsService } from '../clients/clients.service';
import { SheetsService } from '../sheets/sheets.service';
import { SheetsEntity } from '../sheets/sheets.entity';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { ExercisesService } from '../exercises/exercises.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      ClientsEntity,
      SheetsEntity,
      UsersEntity,
      ExercisesEntity,
    ]),
    PassportModule.register({
      defaultStrategy: process.env.DEFAULT_STRATEGY,
      property: process.env.DEFAULT_USER,
      session: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
      },
    }),
  ],
  controllers: [],
  providers: [
    UsersService,
    AuthService,
    JwtService,
    ClientsService,
    SheetsService,
    ExercisesService,
  ],
})
export class UsersModule {}
