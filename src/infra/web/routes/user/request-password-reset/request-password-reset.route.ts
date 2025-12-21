import { Controller, Post, Body } from '@nestjs/common';
import { RequestPasswordResetUsecase } from 'src/usecases/user/request-password-reset/request-password-reset.usecase';
import {
  type RequestPasswordResetRequest,
  type RequestPasswordResetResponse,
} from './request-password-reset.dto';
import { IsPublic } from 'src/infra/web/auth/decorators/is-public.decorator';

@Controller('/users')
export class RequestPasswordResetRoute {
  public constructor(
    private readonly requestPasswordResetUsecase: RequestPasswordResetUsecase,
  ) {}

  @IsPublic()
  @Post('/request-password-reset')
  public async handle(
    @Body() request: RequestPasswordResetRequest,
  ): Promise<RequestPasswordResetResponse> {
    const input = {
      email: request.email,
    };

    await this.requestPasswordResetUsecase.execute(input);

    const response: RequestPasswordResetResponse = {
      message: 'Password reset email sent successfully.',
    };

    return response;
  }
}
