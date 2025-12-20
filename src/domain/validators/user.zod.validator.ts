import z from 'zod';
import { User } from '../entities/user.entity';
import { Validator } from '../shared/validators/validator';
import { ZodUtils } from 'src/shared/utils/zod-utils';
import { ValidatorDomainException } from '../shared/exceptions/validator-domain.exception';

export class UserZodValidator implements Validator<User> {
  private constructor() {}

  static create(): UserZodValidator {
    return new UserZodValidator();
  }

  public validate(input: User): void {
    try {
      this.getZodSchema().parse(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = ZodUtils.formatZodError(error);
        throw new ValidatorDomainException(
          `Error while validating user ${input.getId()}: ${message}`,
          `Os dados fornecidos para o usuário são inválidos: ${message}`,
          UserZodValidator.name,
        );
      }

      const err = error as Error;
      throw new ValidatorDomainException(
        `Unexpected error during user validation: ${err.message}`,
        `Ocorreu um erro inesperado durante a validação do usuário.`,
        UserZodValidator.name,
      );
    }
  }

  private getZodSchema() {
    const zodSchema = z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      password: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    });

    return zodSchema;
  }
}
