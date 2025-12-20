import { Exception } from '../exceptions/exception';

export type ExceptionResponse = {
  statusCode: number;
  timestamp: string;
  message: string;
};

export class ExceptionUtils {
  public static buildErrorReponse(exception: Exception, statusCode: number) {
    const respondeData: ExceptionResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      message: exception.getExternalMessage(),
    };

    return respondeData;
  }
}
