import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';
import { NotAuthorizedUserServiceException } from 'src/infra/services/exceptions/not-authorized-user.service.exception';
import { ExceptionUtils } from 'src/shared/utils/exception-utils';
import { LogUtils } from 'src/shared/utils/log-utils';

@Catch(NotAuthorizedUserServiceException)
export class NotAuthorizedUserServiceExceptionFilter
  implements ExceptionFilter
{
  public catch(
    exception: NotAuthorizedUserServiceException,
    host: ArgumentsHost,
  ) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.UNAUTHORIZED;

    const responseData = ExceptionUtils.buildErrorReponse(exception, status);

    response.status(status).json(responseData);
  }
}

export const NotAuthorizedUserServiceExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: NotAuthorizedUserServiceExceptionFilter,
};
