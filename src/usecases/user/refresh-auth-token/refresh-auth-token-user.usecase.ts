import { Injectable } from '@nestjs/common';
import { UserGateway } from 'src/domain/repositories/user.gateway';
import { JwtService } from 'src/infra/services/jwt/jwt.service';
import { CredentialsNotValidUsecaseException } from 'src/usecases/exceptions/credentials-not-valid.usecase.exception';
import { Usecase } from 'src/usecases/usecase';

export type RefreshAuthTokenUserInput = {
  refreshToken: string;
};

export type RefreshAuthTokenUserOutput = {
  authToken: string;
};

@Injectable()
export class RefreshAuthTokenUserUsecase
  implements Usecase<RefreshAuthTokenUserInput, RefreshAuthTokenUserOutput>
{
  constructor(
    private jwtService: JwtService,
    private readonly userGateway: UserGateway,
  ) {}

  public async execute({
    refreshToken,
  }: RefreshAuthTokenUserInput): Promise<RefreshAuthTokenUserOutput> {
    const { authToken, userId } =
      this.jwtService.generateAuthTokenWithRefreshToken(refreshToken);

    const user = await this.userGateway.findById(userId);

    if (!user) {
      throw new CredentialsNotValidUsecaseException(
        `Refresh token is not valid - ${refreshToken} in ${RefreshAuthTokenUserUsecase.name}.usecase.ts`,
        'Refresh token inválido',
        RefreshAuthTokenUserUsecase.name,
      );
    }

    const output: RefreshAuthTokenUserOutput = {
      authToken,
    };

    return output;
  }
}
