import { Logger } from '@nestjs/common';
import { Exception } from '../exceptions/exception';

export class LogUtils {
  public static logException(exception: Exception) {
    const logger = new Logger(exception.getContext());

    logger.error(exception.getInternalMessage());
    logger.warn(exception.stack);
  }
}
