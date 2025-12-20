import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';
import { ValidatorDomainException } from 'src/domain/shared/exceptions/validator-domain.exception';
import { ExceptionUtils } from 'src/shared/utils/exception-utils';
import { LogUtils } from 'src/shared/utils/log-utils';

@Catch(ValidatorDomainException)
export class ValidatorDomainExceptionFilter implements ExceptionFilter {
  public catch(exception: ValidatorDomainException, host: ArgumentsHost) {
    LogUtils.logException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.BAD_REQUEST;

    const responseData = ExceptionUtils.buildErrorReponse(exception, status);

    response.status(status).json(responseData);
  }
}

export const ValidatorDomainExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: ValidatorDomainExceptionFilter,
};
