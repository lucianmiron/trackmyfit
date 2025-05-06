import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      throw new UnauthorizedException('No authentication token provided');
    }

    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          if (!res) {
            const message = 'Invalid authentication token';
            this.logger.error(message);
            throw new UnauthorizedException(message);
          }
          this.logger.log('User authenticated successfully', res);
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          throw new UnauthorizedException(
            err.message || 'Authentication failed',
          );
        }),
      );
  }
}
