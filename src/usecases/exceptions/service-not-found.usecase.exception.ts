import { UsecaseExeception } from './usecase.exception';

export class ServiceNotFoundUsecaseException extends UsecaseExeception {
  public constructor(
    internalMessage: string,
    externalMessage?: string,
    context?: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = ServiceNotFoundUsecaseException.name;
  }
}
