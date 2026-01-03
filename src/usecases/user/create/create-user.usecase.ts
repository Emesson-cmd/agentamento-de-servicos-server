import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { User } from 'src/domain/entities/user.entity';
import { UserGateway } from 'src/domain/repositories/user.gateway';
import { EmailAlreadyExistsUsecaseException } from 'src/usecases/exceptions/email-already-exists.usecase.exception';
import { Usecase } from 'src/usecases/usecase';

export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type CreateUserOutput = {
  id: string;
};

@Injectable()
export class CreateUserUsecase
  implements Usecase<CreateUserInput, CreateUserOutput>
{
  public constructor(private readonly userGateway: UserGateway) {}

  public async execute({
    email,
    password,
    name,
    phone,
    role,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const existingUser = await this.userGateway.findByEmail(email);

    if (existingUser) {
      throw new EmailAlreadyExistsUsecaseException(
        `User with email ${email} already exists.`,
        `O e-mail ${email} ja existe.`,
        CreateUserUsecase.name,
      );
    }

    const user = User.create({ email, password, name, role, phone });

    await this.userGateway.create(user);

    const output: CreateUserOutput = { id: user.getId() };
    return output;
  }
}
