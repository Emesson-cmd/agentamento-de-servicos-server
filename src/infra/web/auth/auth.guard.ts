import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { Request } from 'express';
import { NotAuthorizedUserServiceException } from 'src/infra/services/exceptions/not-authorized-user.service.exception';
import { JwtService } from 'src/infra/services/jwt/jwt.service';
import { IS_PUBLIC } from './decorators/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.exctractTokenFromRequest(request);

    if (!token) {
      throw new NotAuthorizedUserServiceException(
        'Token not found.',
        'Usuário não autenticado.',
        AuthGuard.name,
      );
    }

    const payload = this.jwtService.verifyAuthToken(token);

    if (!payload) {
      throw new NotAuthorizedUserServiceException(
        'Token not valid.',
        'Token inválido.',
        AuthGuard.name,
      );
    }

    request['userId'] = payload.userId;

    return true;
  }

  private exctractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export const AuthGuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
