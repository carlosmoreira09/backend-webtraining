import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class AuthLocalGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('handle existes', info);

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    console.log(user)
    return user;
  }
}
