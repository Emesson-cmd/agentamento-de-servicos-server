import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';
import { RefreshTokenNotValidServiceException } from 'src/infra/services/exceptions/refresh-token-not-valid.service.exception';
import { ExceptionUtils } from 'src/shared/utils/exception-utils';
import { LogUtils } from 'src/shared/utils/log-utils';

@Catch(RefreshTokenNotValidServiceException)
export class RefreshTokenNotValidServiceExceptionFilter
  implements ExceptionFilter
{
  public catch(
    exception: RefreshTokenNotValidServiceException,
    host: ArgumentsHost,
  ) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const responseData = ExceptionUtils.buildErrorReponse(exception, status);

    response.status(status).json(responseData);
  }
}

export const RefreshTokenNotValidServiceExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: RefreshTokenNotValidServiceExceptionFilter,
};
