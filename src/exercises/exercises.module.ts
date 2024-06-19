import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from '../guards/local-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../guards/jwt-strategy';
import { ClientsService } from '../clients/clients.service';
import { ExercisesController } from './exercises.controller';
import { AuthService } from '../auth/auth.service';
import { ExercisesService } from './exercises.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from '../clients/clients.entity';
import { UsersEntity } from '../users/users.entity';
import { ExercisesEntity } from './exercises.entity';
import { PassportModule } from '@nestjs/passport';
import { SheetsEntity } from '../sheets/sheets.entity';
import { SheetsService } from '../sheets/sheets.service';

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
  controllers: [ExercisesController],
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
export class ExercisesModule {
}
