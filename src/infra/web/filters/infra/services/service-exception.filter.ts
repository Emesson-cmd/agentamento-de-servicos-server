import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';
import { ServiceException } from 'src/infra/services/exceptions/service.exception';
import { ExceptionUtils } from 'src/shared/utils/exception-utils';
import { LogUtils } from 'src/shared/utils/log-utils';

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
  public catch(exception: ServiceException, host: ArgumentsHost) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const responseData = ExceptionUtils.buildErrorReponse(exception, status);

    response.status(status).json(responseData);
  }
}

export const ServiceExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: ServiceExceptionFilter,
};
