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
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ExercisesEntity, ClientsEntity, UsersEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
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
    ConfigService,
    ExercisesService,
    ClientsService,
    UsersService,
    AuthService,
  ],
})
export class ExercisesModule {}
