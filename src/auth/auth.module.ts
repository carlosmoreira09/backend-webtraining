import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from '../clients/clients.entity';
import { UsersEntity } from '../users/users.entity';
import { LocalStrategy } from '../guards/local-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../guards/jwt-strategy';
import { ExercisesService } from '../exercises/exercises.service';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { ClientsService } from '../clients/clients.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ClientsEntity, UsersEntity, ExercisesEntity]),
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
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    LocalStrategy,
    ConfigService,
    ExercisesService,
    ClientsService,
  ],
})
export class AuthModule {}
