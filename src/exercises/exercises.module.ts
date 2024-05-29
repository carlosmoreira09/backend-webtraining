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
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt_config } from '../utils/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExercisesEntity, ClientsEntity, UsersEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true,
    }),
    JwtModule.register({
      secret: jwt_config.secret,
      signOptions: {
        expiresIn: jwt_config.expired,
      },
    }),
  ],
  controllers: [ExercisesController],
  providers: [
    ExercisesService,
    ClientsService,
    UsersService,
    AuthService,
    JwtStrategy,
  ],
})
export class ExercisesModule {}
