import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  @Inject(AuthService) helper: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const jwtToken = context
      .switchToHttp()
      .getRequest()
      .headers['authorization'].split('Bearer ')[1];
    let user = null;
    if (jwtToken) {
      if (await this.helper.validate(jwtToken)) {
        user = await this.helper.decode(jwtToken);
      }
    }
    return !!(user && user.username);
  }
}
