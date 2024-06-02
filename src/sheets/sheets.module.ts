import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetsEntity } from './sheets.entity';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { ExercisesService } from '../exercises/exercises.service';
import { ClientsService } from '../clients/clients.service';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { ClientsEntity } from '../clients/clients.entity';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../guards/local-strategy';
import { JwtStrategy } from '../guards/jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      ClientsEntity,
      UsersEntity,
      ExercisesEntity,
      SheetsEntity,
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
    AuthModule,
  ],
  controllers: [SheetsController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    LocalStrategy,
    ConfigService,
    ExercisesService,
    ClientsService,
    SheetsService,
  ],
})
export class SheetsModule {}
