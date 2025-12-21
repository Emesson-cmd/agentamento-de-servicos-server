import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserGateway } from 'src/domain/repositories/user.gateway';
import { Utils } from 'src/shared/utils/utils';
import { UserPasswordValidatorFactory } from 'src/domain/factories/user-password.validator.factory';
import { InvalidResetTokenUsecaseException } from 'src/usecases/exceptions/invalid-reset-token.usecase.exception';
import { Usecase } from 'src/usecases/usecase';

export type ResetPasswordInput = {
  token: string;
  newPassword: string;
};

export type ResetPasswordOutput = void;

@Injectable()
export class ResetPasswordUsecase
  implements Usecase<ResetPasswordInput, ResetPasswordOutput>
{
  public constructor(private readonly userGateway: UserGateway) {}

  public async execute({
    token,
    newPassword,
  }: ResetPasswordInput): Promise<ResetPasswordOutput> {
    const user = await this.userGateway.findByResetToken(token);

    if (!user) {
      throw new InvalidResetTokenUsecaseException(
        `Invalid reset token ${token}.`,
        `Token de redefinição inválido.`,
        ResetPasswordUsecase.name,
      );
    }

    const expiresAt = user.getResetTokenExpiresAt();
    if (!expiresAt || expiresAt < new Date()) {
      throw new InvalidResetTokenUsecaseException(
        `Expired reset token ${token}.`,
        `Token de redefinição expirado.`,
        ResetPasswordUsecase.name,
      );
    }

    UserPasswordValidatorFactory.create().validate(newPassword);
    const hashedPassword = Utils.encryptPassword(newPassword);

    const updatedUser = User.with({
      id: user.getId(),
      email: user.getEmail(),
      password: hashedPassword,
      resetToken: undefined,
      resetTokenExpiresAt: undefined,
      createdAt: user.getCreatedAt(),
      updatedAt: new Date(),
    });

    await this.userGateway.update(updatedUser);
  }
}
