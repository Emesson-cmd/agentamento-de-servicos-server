import { Service } from '../entities/service.entity';
import { Validator } from '../shared/validators/validator';
import { ServiceZodValidator } from '../validators/service.zod.validator';

export class ServiceValidatorServiceFactory {
  public static create(): Validator<Service> {
    return ServiceZodValidator.create();
  }
}
