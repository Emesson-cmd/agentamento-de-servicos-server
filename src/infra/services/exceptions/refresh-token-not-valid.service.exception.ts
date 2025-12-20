import { ServiceException } from './service.exception';

export class RefreshTokenNotValidServiceException extends ServiceException {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = RefreshTokenNotValidServiceException.name;
  }
}
