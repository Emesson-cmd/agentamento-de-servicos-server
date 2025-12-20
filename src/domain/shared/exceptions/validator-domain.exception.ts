import { DomainException } from './domain.exception';

export class ValidatorDomainException extends DomainException {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = ValidatorDomainException.name;
  }
}
