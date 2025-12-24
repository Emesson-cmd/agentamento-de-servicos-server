import { Provider } from '@nestjs/common';
import { EMAIL_SERVICE } from '../email.constants';
import { NodemailerEmailService } from './nodemailer/nodemailer.email.service';
import { ResendEmailService } from './resend/resend.email.service';

export const emailServiceProvider: Provider = {
  provide: EMAIL_SERVICE,
  useFactory: () => {
    const env = process.env.NODE_ENV;

    if (env === 'production') {
      return new ResendEmailService();
    }

    return new NodemailerEmailService();
  },
};
