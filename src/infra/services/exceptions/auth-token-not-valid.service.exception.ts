import { ServiceException } from './service.exception';

export class AuthTokenNotValidServiceException extends ServiceException {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = AuthTokenNotValidServiceException.name;
  }
}
