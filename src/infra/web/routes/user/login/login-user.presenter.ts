import { LoginUserOutput } from 'src/usecases/user/login/login-user.usecase';
import { LoginUserResponse } from './login-user.dto';

export class LoginUserPresenter {
  public static toHttp(input: LoginUserOutput): LoginUserResponse {
    return {
      authToken: input.authToken,
      refreshToken: input.refreshToken,
    };
  }
}
