import { Module } from '@nestjs/common';
import { JsonWebTokenService } from './jwt/jsonwebtoken/jsonwebtoken.jwt.service';
import { jsonWebTokenJwtServiceProvider } from './jwt/jsonwebtoken/jsonwebtoken.jwt.service.provider';
import { NodemailerEmailService } from './email/nodemailer/nodemailer.email.service';
import { nodemailerEmailServiceProvider } from './email/nodemailer/nodemailer.email.service.provider';

@Module({
  imports: [],
  providers: [
    JsonWebTokenService,
    jsonWebTokenJwtServiceProvider,
    NodemailerEmailService,
    nodemailerEmailServiceProvider,
  ],
  exports: [jsonWebTokenJwtServiceProvider, nodemailerEmailServiceProvider],
})
export class ServiceModule {}
