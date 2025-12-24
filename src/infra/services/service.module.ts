import { Module } from '@nestjs/common';
import { JsonWebTokenService } from './jwt/jsonwebtoken/jsonwebtoken.jwt.service';
import { jsonWebTokenJwtServiceProvider } from './jwt/jsonwebtoken/jsonwebtoken.jwt.service.provider';
import { emailServiceProvider } from './email/email.service.provider';

@Module({
  imports: [],
  providers: [
    JsonWebTokenService,
    jsonWebTokenJwtServiceProvider,
    emailServiceProvider,
  ],
  exports: [jsonWebTokenJwtServiceProvider, emailServiceProvider],
})
export class ServiceModule {}
