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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ClientsEntity, UsersEntity]),
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
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    LocalStrategy,
    ConfigService,
  ],
})
export class AuthModule {}
