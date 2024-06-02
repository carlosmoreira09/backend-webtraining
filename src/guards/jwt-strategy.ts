import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id_user,
      username: payload.username,
      name: payload.fullName,
      email: payload.email,
      role: payload.userType,
      exp: payload.exp,
    };
  }
}