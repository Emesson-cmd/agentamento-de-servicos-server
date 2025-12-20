import { CreateUserOutput } from 'src/usecases/user/create/create-user.usecase';
import { CreateUserRouteResponse } from './create-user.dto';

export class CreateUserPresenter {
  public static toHttp(input: CreateUserOutput): CreateUserRouteResponse {
    const output: CreateUserRouteResponse = {
      id: input.id,
    };

    return output;
  }
}
