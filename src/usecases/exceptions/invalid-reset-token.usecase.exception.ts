import { UsecaseExeception } from './usecase.exception';

export class InvalidResetTokenUsecaseException extends UsecaseExeception {
  public constructor(
    internalMessage: string,
    externalMessage: string,
    className: string,
  ) {
    super(internalMessage, externalMessage, className);
  }
}
