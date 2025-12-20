import { Controller, Get } from '@nestjs/common';
import {
  FindUserInput,
  FindUserUsecase,
} from 'src/usecases/user/findById/find-user.usecase';
import { FindByIdUserResponse } from './find-by-id-user.dto';
import { FindByIdUserPresenter } from './find-by-id-user.presenter';
import { UserId } from 'src/infra/web/auth/decorators/user-id.decorator';

@Controller('/users')
export class FindByIdUserRoute {
  public constructor(private readonly findUserUsecase: FindUserUsecase) {}

  @Get('/me')
  public async getCurrentUser(
    @UserId() userId: string,
  ): Promise<FindByIdUserResponse> {
    const input: FindUserInput = { id: userId };

    const output = await this.findUserUsecase.execute(input);

    const response = FindByIdUserPresenter.toHttp(output);

    return response;
  }
}
