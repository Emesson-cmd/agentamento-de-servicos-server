import z from 'zod';
import { Service } from '../entities/service.entity';
import { ZodUtils } from 'src/shared/utils/zod-utils';
import { ValidatorDomainException } from '../shared/exceptions/validator-domain.exception';

export class ServiceZodValidator {
  private constructor() {}

  static create(): ServiceZodValidator {
    return new ServiceZodValidator();
  }

  public validate(input: Service): void {
    try {
      this.getZodSchema().parse(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = ZodUtils.formatZodError(error);
        throw new ValidatorDomainException(
          `Error while validating service ${input.getId()}: ${message}`,
          `Os dados fornecidos para o serviço são inválidos: ${message}`,
          ServiceZodValidator.name,
        );
      }

      const err = error as Error;
      throw new ValidatorDomainException(
        `Unexpected error during service validation: ${err.message}`,
        `Ocorreu um erro inesperado durante a validação do serviço.`,
        ServiceZodValidator.name,
      );
    }
  }

  private getZodSchema() {
    const zodSchema = z.object({
      id: z.string().uuid(),
      createdAt: z.date(),
      updatedAt: z.date(),
      name: z.string(),
      price: z.number(),
      durationMin: z.number(),
      description: z.string().optional(),
    });

    return zodSchema;
  }
}
