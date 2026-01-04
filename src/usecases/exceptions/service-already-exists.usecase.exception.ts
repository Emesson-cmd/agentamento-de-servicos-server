import { UsecaseExeception } from './usecase.exception';

export class ServiceAlreadyExistsUsecaseException extends UsecaseExeception {
  public constructor(
    internalMessage: string,
    externalMessage?: string,
    context?: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = ServiceAlreadyExistsUsecaseException.name;
  }
}
