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
import { ServiceNotFoundUsecaseException } from 'src/usecases/exceptions/service-not-found.usecase.exception';

@Catch(ServiceNotFoundUsecaseException)
export class ServiceNotFoundUsecaseExceptionFilter implements ExceptionFilter {
  public catch(
    exception: ServiceNotFoundUsecaseException,
    host: ArgumentsHost,
  ) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.NOT_FOUND;

    const responseData = ExceptionUtils.buildErrorReponse(exception, status);

    response.status(status).json(responseData);
  }
}

export const ServiceNotFoundUsecaseExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: ServiceNotFoundUsecaseExceptionFilter,
};
