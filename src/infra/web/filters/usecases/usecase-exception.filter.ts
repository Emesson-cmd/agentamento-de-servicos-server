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
import { UsecaseExeception } from 'src/usecases/exceptions/usecase.exception';

@Catch(UsecaseExeception)
export class UsecaseExeceptionFilter implements ExceptionFilter {
  public catch(exception: UsecaseExeception, host: ArgumentsHost) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const responseData = ExceptionUtils.buildErrorReponse(exception, status);

    response.status(status).json(responseData);
  }
}

export const UsecaseExeceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: UsecaseExeceptionFilter,
};
