import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt_config } from '../utils/constants';
import { JwtStrategy } from '../guards/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from '../clients/clients.entity';
import { UsersEntity } from '../users/users.entity';
import { LocalStrategy } from '../guards/local-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientsEntity, UsersEntity]),
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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, LocalStrategy],
})
export class AuthModule {}
