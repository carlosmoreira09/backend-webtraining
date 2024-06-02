import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from './clients.entity';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({
      defaultStrategy: process.env.DEFAULT_STRATEGY,
      session: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
      },
    }),
    TypeOrmModule.forFeature([ClientsEntity, UsersEntity])],
  controllers: [ClientsController],
  providers: [ClientsService, UsersService, AuthService, JwtService],
})
export class ClientsModule {}
