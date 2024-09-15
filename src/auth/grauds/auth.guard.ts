import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    return this.validateRequest(email, password, request);
  }

  async validateRequest(
    email: string,
    password: string,
    request: any,
  ): Promise<boolean> {
    const user = await this.authService.validateUser(email, password);
    if (user) {
      request.user = user;
      return true;
    }
    return false;
  }
}
