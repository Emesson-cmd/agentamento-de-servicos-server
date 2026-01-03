import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserInput,
  CreateUserUsecase,
} from 'src/usecases/user/create/create-user.usecase';
import {
  type CreateUserRouteRequest,
  CreateUserRouteResponse,
} from './create-user.dto';
import { CreateUserPresenter } from './create-user.presenter';
import { IsPublic } from 'src/infra/web/auth/decorators/is-public.decorator';

@Controller('users')
export class CreateUserRoute {
  public constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @IsPublic()
  @Post()
  public async handle(
    @Body() request: CreateUserRouteRequest,
  ): Promise<CreateUserRouteResponse> {
    const input: CreateUserInput = {
      email: request.email,
      password: request.password,
      name: request.name,
      phone: request.phone,
      role: request.role,
    };

    const result = await this.createUserUsecase.execute(input);

    const response: CreateUserRouteResponse =
      CreateUserPresenter.toHttp(result);

    return response;
  }
}
