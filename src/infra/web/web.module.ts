import { Module } from '@nestjs/common';
import { CreateUserRoute } from './routes/user/create/create-user.route';
import { UsecaseModule } from 'src/usecases/usecase.module';
import { ValidatorDomainExceptionFilterProvider } from './filters/domain/validator-domain-exception.filter';
import { DomainExceptionFilterProvider } from './filters/domain/domain-exception.filter';
import { UsecaseExeceptionFilterProvider } from './filters/usecases/usecase-exception.filter';
import { CredentialsNotValidUsecaseExceptionFilterProvider } from './filters/usecases/credentials-not-valid-usecase-exception.filter';
import { EmailAlreadyExistsUsecaseExceptionFilterProvider } from './filters/usecases/email-already-exists-usecase-exception.filter';
import { UserNotFoundUsecaseExceptionFilterProvider } from './filters/usecases/user-not-found-usecase-exception.filter';
import { ServiceExceptionFilterProvider } from './filters/infra/services/service-exception.filter';
import { RefreshTokenNotValidServiceExceptionFilterProvider } from './filters/infra/services/refresh-token-not-valid-service-exception.filter';
import { LoginUserRoute } from './routes/user/login/login-user.route';
import { RefreshAuthTokenRoute } from './routes/user/refresh-auth-token/refresh-auth-token.route';
import { FindByIdUserRoute } from './routes/user/find-by-id/find-by-id-user.route';
import { RequestPasswordResetRoute } from './routes/user/request-password-reset/request-password-reset.route';
import { ResetPasswordRoute } from './routes/user/reset-password/reset-password.route';
import { AuthGuardProvider } from './auth/auth.guard';
import { ServiceModule } from '../services/service.module';
import { NotAuthorizedUserServiceExceptionFilterProvider } from './filters/infra/services/not-authorized-user-exception.filter';
import { InvalidResetTokenUsecaseExceptionFilterProvider } from './filters/usecases/invalid-reset-token-usecase-exception.filter';

@Module({
  imports: [ServiceModule, UsecaseModule],
  controllers: [
    CreateUserRoute,
    LoginUserRoute,
    RefreshAuthTokenRoute,
    FindByIdUserRoute,
    RequestPasswordResetRoute,
    ResetPasswordRoute,
  ],
  providers: [
    AuthGuardProvider,
    ValidatorDomainExceptionFilterProvider,
    DomainExceptionFilterProvider,
    UsecaseExeceptionFilterProvider,
    CredentialsNotValidUsecaseExceptionFilterProvider,
    EmailAlreadyExistsUsecaseExceptionFilterProvider,
    UserNotFoundUsecaseExceptionFilterProvider,
    ServiceExceptionFilterProvider,
    RefreshTokenNotValidServiceExceptionFilterProvider,
    NotAuthorizedUserServiceExceptionFilterProvider,
    InvalidResetTokenUsecaseExceptionFilterProvider,
  ],
})
export class WebModule {}
