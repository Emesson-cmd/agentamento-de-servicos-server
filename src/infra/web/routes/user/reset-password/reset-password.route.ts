import { Controller, Post, Body } from '@nestjs/common';
import { ResetPasswordUsecase } from 'src/usecases/user/reset-password/reset-password.usecase';
import {
  type ResetPasswordRequest,
  type ResetPasswordResponse,
} from './reset-password.dto';
import { IsPublic } from 'src/infra/web/auth/decorators/is-public.decorator';

@Controller('/users')
export class ResetPasswordRoute {
  public constructor(
    private readonly resetPasswordUsecase: ResetPasswordUsecase,
  ) {}

  @IsPublic()
  @Post('/reset-password')
  public async handle(
    @Body() request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    const input = {
      token: request.token,
      newPassword: request.newPassword,
    };

    await this.resetPasswordUsecase.execute(input);

    const response: ResetPasswordResponse = {
      message: 'Password reset successfully.',
    };

    return response;
  }
}
