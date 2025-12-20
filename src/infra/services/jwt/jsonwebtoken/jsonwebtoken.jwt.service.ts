import * as jsonwebtoken from 'jsonwebtoken';
import { ServiceException } from '../../exceptions/service.exception';
import {
  GenerateAuthTokenWithRefreshTokenOutput,
  JwtAuthPayload,
  JwtRefreshPayload,
  JwtService,
} from '../jwt.service';
import { RefreshTokenNotValidServiceException } from '../../exceptions/refresh-token-not-valid.service.exception';
import { Injectable } from '@nestjs/common';
import { AuthTokenNotValidServiceException } from '../../exceptions/auth-token-not-valid.service.exception';

@Injectable()
export class JsonWebTokenService extends JwtService {
  private authSecret: string;
  private refreshSecret: string;

  public constructor() {
    super();

    if (!process.env.JWT_AUTH_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new ServiceException(
        `Missing JWT_AUTH_SECRET or JWT_REFRESH_SECRET environment variables ${JsonWebTokenService.name}`,
        'Houve um erro ao gerar o token de autenticação',
        JsonWebTokenService.name,
      );
    }

    this.authSecret = process.env.JWT_AUTH_SECRET;
    this.refreshSecret = process.env.JWT_REFRESH_SECRET;
  }

  public generateAuthToken(userId: string): string {
    const payload = this.generateAuthTokenPayload(userId);

    return jsonwebtoken.sign(payload, this.authSecret, {
      expiresIn: '1h',
    });
  }

  private generateAuthTokenPayload(userId: string): JwtAuthPayload {
    const payload: JwtAuthPayload = {
      userId,
    };

    return payload;
  }

  public generateRefreshToken(userId: string): string {
    const payload = this.generateRefreshTokenPayload(userId);

    return jsonwebtoken.sign(payload, this.refreshSecret, {
      expiresIn: '7d',
    });
  }

  private generateRefreshTokenPayload(userId: string): JwtRefreshPayload {
    const payload: JwtRefreshPayload = {
      userId,
    };

    return payload;
  }

  public generateAuthTokenWithRefreshToken(
    refreshToken: string,
  ): GenerateAuthTokenWithRefreshTokenOutput {
    try {
      const payload = jsonwebtoken.verify(
        refreshToken,
        this.refreshSecret,
      ) as JwtRefreshPayload;

      const userId = payload.userId;

      const authToken = this.generateAuthToken(userId);

      const output: GenerateAuthTokenWithRefreshTokenOutput = {
        authToken,
        userId,
      };

      return output;
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        throw new RefreshTokenNotValidServiceException(
          `Refresh token ${refreshToken} expired - ${error.message} in ${JsonWebTokenService.name}.usecase.ts`,
          'Credenciais inválidas. Faça login novamente.',
          JsonWebTokenService.name,
        );
      }

      const err = error as Error;

      throw new RefreshTokenNotValidServiceException(
        `Refresh token ${refreshToken} is not valid - ${err.message} in ${JsonWebTokenService.name}.usecase.ts`,
        'Credenciais inválidas. Faça login novamente.',
        JsonWebTokenService.name,
      );
    }
  }

  public verifyAuthToken(token: string): JwtAuthPayload {
    try {
      return jsonwebtoken.verify(token, this.authSecret) as JwtAuthPayload;
      // eslint-disable-next-line
    } catch (error) {
      throw new ServiceException(
        `Token ${token} is not valid  in ${AuthTokenNotValidServiceException.name}.usecase.ts`,
        'Credenciais inválidas. Faça login novamente.',
        AuthTokenNotValidServiceException.name,
      );
    }
  }
}
