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
import { InvalidResetTokenUsecaseException } from 'src/usecases/exceptions/invalid-reset-token.usecase.exception';

@Catch(InvalidResetTokenUsecaseException)
export class InvalidResetTokenUsecaseExceptionFilter
  implements ExceptionFilter
{
  public catch(
    exception: InvalidResetTokenUsecaseException,
    host: ArgumentsHost,
  ) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.BAD_REQUEST;

    const responseData = ExceptionUtils.buildErrorReponse(exception, status);

    response.status(status).json(responseData);
  }
}

export const InvalidResetTokenUsecaseExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: InvalidResetTokenUsecaseExceptionFilter,
};
