import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserUsecase } from 'src/usecases/user/login/login-user.usecase';
import {
  type LoginUserRequest,
  type LoginUserResponse,
} from './login-user.dto';
import { LoginUserPresenter } from './login-user.presenter';
import { IsPublic } from 'src/infra/web/auth/decorators/is-public.decorator';

@Controller('/users')
export class LoginUserRoute {
  public constructor(private readonly loginUserUsecase: LoginUserUsecase) {}

  @IsPublic()
  @Post('/login')
  public async handle(
    @Body() request: LoginUserRequest,
  ): Promise<LoginUserResponse> {
    const input = {
      email: request.email,
      password: request.password,
    };

    const result = await this.loginUserUsecase.execute(input);

    const response: LoginUserResponse = LoginUserPresenter.toHttp(result);

    return response;
  }
}
