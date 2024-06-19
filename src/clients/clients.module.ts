import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../guards/jwt-strategy';
import { LocalStrategy } from '../guards/local-strategy';
import { ExercisesService } from '../exercises/exercises.service';
import { SheetsService } from '../sheets/sheets.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from './clients.entity';
import { UsersEntity } from '../users/users.entity';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { SheetsEntity } from '../sheets/sheets.entity';
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
  ],
  controllers: [ClientsController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    LocalStrategy,
    ConfigService,
    ClientsService,
    ExercisesService,
    SheetsService,
  ],
})
export class ClientsModule {}
