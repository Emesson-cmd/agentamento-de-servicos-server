import { Exception } from 'src/shared/exceptions/exception';

export class DomainException extends Exception {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = DomainException.name;
  }
}
