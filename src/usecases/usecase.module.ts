import { Module } from '@nestjs/common';
import { CreateUserUsecase } from './user/create/create-user.usecase';
import { FindUserUsecase } from './user/findById/find-user.usecase';
import { LoginUserUsecase } from './user/login/login-user.usecase';
import { RefreshAuthTokenUserUsecase } from './user/refresh-auth-token/refresh-auth-token-user.usecase';
import { DatabaseModule } from 'src/infra/repositories/prisma/database.module';
import { ServiceModule } from 'src/infra/services/service.module';

@Module({
  imports: [DatabaseModule, ServiceModule],
  providers: [
    CreateUserUsecase,
    FindUserUsecase,
    LoginUserUsecase,
    RefreshAuthTokenUserUsecase,
  ],
  exports: [
    CreateUserUsecase,
    FindUserUsecase,
    LoginUserUsecase,
    RefreshAuthTokenUserUsecase,
  ],
})
export class UsecaseModule {}
