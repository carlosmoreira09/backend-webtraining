import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwt_config } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt_config.secret,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id_user,
      sub: payload.username,
      name: payload.fullName,
      email: payload.email,
      exp: payload.exp,
    };
  }
}
