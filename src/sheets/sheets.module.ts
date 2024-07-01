import { Module } from '@nestjs/common';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { ExercisesService } from '../exercises/exercises.service';
import { ClientsService } from '../clients/clients.service';
import { UsersService } from '../users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../guards/local-strategy';
import { JwtStrategy } from '../guards/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from '../clients/clients.entity';
import { UsersEntity } from '../users/users.entity';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { SheetsEntity } from './sheets.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    TypeOrmModule.forFeature([
      ClientsEntity,
      UsersEntity,
      ExercisesEntity,
      SheetsEntity,
    ]),
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
export class SheetsModule {
}
