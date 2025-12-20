import { ServiceException } from './service.exception';

export class NotAuthorizedUserServiceException extends ServiceException {
  constructor(
    internalMessage: string,
    externalMessage: string,
    context: string,
  ) {
    super(internalMessage, externalMessage, context);
    this.name = NotAuthorizedUserServiceException.name;
  }
}
