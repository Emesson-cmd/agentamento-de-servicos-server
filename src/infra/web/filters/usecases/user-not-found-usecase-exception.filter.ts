import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';
import { ExceptionUtils } from 'src/shared/utils/exception-utils';
import { LogUtils } from 'src/shared/utils/log-utils';
import { UserNotFoundUsecaseException } from 'src/usecases/exceptions/user-not-found.usecase.exception';

@Catch(UserNotFoundUsecaseException)
export class UserNotFoundUsecaseExceptionFilter implements ExceptionFilter {
  public catch(exception: UserNotFoundUsecaseException, host: ArgumentsHost) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.NOT_FOUND;

    const responseData = ExceptionUtils.buildErrorReponse(exception, status);

    response.status(status).json(responseData);
  }
}

export const UserNotFoundUsecaseExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: UserNotFoundUsecaseExceptionFilter,
};
