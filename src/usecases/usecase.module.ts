import { Module } from '@nestjs/common';
import { CreateUserUsecase } from './user/create/create-user.usecase';
import { FindUserUsecase } from './user/findById/find-user.usecase';
import { LoginUserUsecase } from './user/login/login-user.usecase';
import { RefreshAuthTokenUserUsecase } from './user/refresh-auth-token/refresh-auth-token-user.usecase';
import { RequestPasswordResetUsecase } from './user/request-password-reset/request-password-reset.usecase';
import { ResetPasswordUsecase } from './user/reset-password/reset-password.usecase';
import { DatabaseModule } from 'src/infra/repositories/prisma/database.module';
import { ServiceModule } from 'src/infra/services/service.module';
import { CreateServiceUsecase } from './service/create/create-service.usecase';
import { FindServiceUsecase } from './service/findById/find-service.usecase';

@Module({
  imports: [DatabaseModule, ServiceModule],
  providers: [
    CreateUserUsecase,
    FindUserUsecase,
    LoginUserUsecase,
    RefreshAuthTokenUserUsecase,
    RequestPasswordResetUsecase,
    ResetPasswordUsecase,
    CreateServiceUsecase,
    FindServiceUsecase,
  ],
  exports: [
    CreateUserUsecase,
    FindUserUsecase,
    LoginUserUsecase,
    RefreshAuthTokenUserUsecase,
    RequestPasswordResetUsecase,
    ResetPasswordUsecase,
    CreateServiceUsecase,
    FindServiceUsecase,
  ],
})
export class UsecaseModule {}
