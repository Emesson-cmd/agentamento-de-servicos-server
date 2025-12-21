import { Injectable } from '@nestjs/common';
import { addHours } from 'date-fns';
import { UserGateway } from 'src/domain/repositories/user.gateway';
import { Utils } from 'src/shared/utils/utils';
import { EmailService } from 'src/infra/services/email/email.service';
import { UserNotFoundUsecaseException } from 'src/usecases/exceptions/user-not-found.usecase.exception';
import { Usecase } from 'src/usecases/usecase';

export type RequestPasswordResetInput = {
  email: string;
};

export type RequestPasswordResetOutput = void;

@Injectable()
export class RequestPasswordResetUsecase
  implements Usecase<RequestPasswordResetInput, RequestPasswordResetOutput>
{
  public constructor(
    private readonly userGateway: UserGateway,
    private readonly emailService: EmailService,
  ) {}

  public async execute({
    email,
  }: RequestPasswordResetInput): Promise<RequestPasswordResetOutput> {
    const user = await this.userGateway.findByEmail(email);

    if (!user) {
      throw new UserNotFoundUsecaseException(
        `User with email ${email} not found.`,
        `Usuário com e-mail ${email} não encontrado.`,
        RequestPasswordResetUsecase.name,
      );
    }

    const resetToken = Utils.generateUUID();
    const resetTokenExpiresAt = addHours(new Date(), 1); // 1 hour

    user.setResetToken(resetToken, resetTokenExpiresAt);

    await this.userGateway.update(user);

    await this.emailService.sendPasswordResetEmail(email, resetToken);
  }
}
