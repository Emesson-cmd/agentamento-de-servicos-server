import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { NotAuthorizedUserServiceException } from 'src/infra/services/exceptions/not-authorized-user.service.exception';

type UserIdRequestType = Request & { userId?: string };

export const UserId = createParamDecorator<undefined, string>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<UserIdRequestType>();
    const userId = request.userId;

    if (!userId) {
      throw new NotAuthorizedUserServiceException(
        'Token not found.',
        'Usuário não autenticado.',
        createParamDecorator.name,
      );
    }

    return userId;
  },
);
