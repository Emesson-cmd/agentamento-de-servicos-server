import { EmailService } from '../email.service';
import { ResendEmailService } from './resend.email.service';

export const resendEmailServiceProvider = {
  provide: EmailService,
  useClass: ResendEmailService,
};
