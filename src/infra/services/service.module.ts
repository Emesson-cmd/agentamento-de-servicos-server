import { Module } from '@nestjs/common';
import { JsonWebTokenService } from './jwt/jsonwebtoken/jsonwebtoken.jwt.service';
import { jsonWebTokenJwtServiceProvider } from './jwt/jsonwebtoken/jsonwebtoken.jwt.service.provider';
// import { NodemailerEmailService } from './email/nodemailer/nodemailer.email.service';
// import { nodemailerEmailServiceProvider } from './email/nodemailer/nodemailer.email.service.provider';
import { resendEmailServiceProvider } from './email/resend/resend.email.service.provider';
import { ResendEmailService } from './email/resend/resend.email.service';

@Module({
  imports: [],
  providers: [
    JsonWebTokenService,
    jsonWebTokenJwtServiceProvider,
    // NodemailerEmailService,
    // nodemailerEmailServiceProvider,
    ResendEmailService,
    resendEmailServiceProvider,
  ],
  exports: [
    jsonWebTokenJwtServiceProvider,
    // nodemailerEmailServiceProvider,
    resendEmailServiceProvider,
  ],
})
export class ServiceModule {}
