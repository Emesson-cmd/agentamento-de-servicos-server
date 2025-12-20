import { Controller, Post, Body } from '@nestjs/common';
import {
  RefreshAuthTokenUserInput,
  RefreshAuthTokenUserUsecase,
} from 'src/usecases/user/refresh-auth-token/refresh-auth-token-user.usecase';
import {
  type RefreshAuthTokenRequest,
  RefreshAuthTokenResponse,
} from './refresh-auth-token.dto';
import { RefreshAuthTokenPresenter } from './refresh-auth-token.presenter';
import { IsPublic } from 'src/infra/web/auth/decorators/is-public.decorator';

@Controller('/users')
export class RefreshAuthTokenRoute {
  public constructor(
    private readonly refreshAuthTokenUserUsecase: RefreshAuthTokenUserUsecase,
  ) {}

  @IsPublic()
  @Post('/refresh')
  public async handle(
    @Body() request: RefreshAuthTokenRequest,
  ): Promise<RefreshAuthTokenResponse> {
    const input: RefreshAuthTokenUserInput = {
      refreshToken: request.refreshAuthToken,
    };

    const output = await this.refreshAuthTokenUserUsecase.execute(input);

    const response = RefreshAuthTokenPresenter.toHttp(output);

    return response;
  }
}
