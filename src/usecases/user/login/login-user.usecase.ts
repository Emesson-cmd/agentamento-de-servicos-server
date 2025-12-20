import { Injectable } from '@nestjs/common';
import { UserGateway } from 'src/domain/repositories/user.gateway';
import { JwtService } from 'src/infra/services/jwt/jwt.service';
import { CredentialsNotValidUsecaseException } from 'src/usecases/exceptions/credentials-not-valid.usecase.exception';
import { Usecase } from 'src/usecases/usecase';

export type LoginUserInput = {
  email: string;
  password: string;
};

export type LoginUserOutput = {
  authToken: string;
  refreshToken: string;
};

@Injectable()
export class LoginUserUsecase
  implements Usecase<LoginUserInput, LoginUserOutput>
{
  public constructor(
    private readonly userGateway: UserGateway,
    private readonly jwtService: JwtService,
  ) {}

  public async execute({
    email,
    password,
  }: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.userGateway.findByEmail(email);

    if (!user) {
      throw new CredentialsNotValidUsecaseException(
        `User with email ${email} not found.`,
        `Usuário não encontrado.`,
        LoginUserUsecase.name,
      );
    }

    const inputPassword = user.comparePassword(password);
    if (!inputPassword) {
      throw new CredentialsNotValidUsecaseException(
        `Password for user with email ${email} is not valid.`,
        `Senha inválida.`,
        LoginUserUsecase.name,
      );
    }

    // eslint-disable-next-line
    const authToken = await this.jwtService.generateAuthToken(user.getId());
    // eslint-disable-next-line
    const refreshToken = await this.jwtService.generateRefreshToken(
      user.getId(),
    );

    const output: LoginUserOutput = {
      authToken,
      refreshToken,
    };

    return output;
  }
}
