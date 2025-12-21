import { EmailService } from '../email.service';
import { NodemailerEmailService } from './nodemailer.email.service';

export const nodemailerEmailServiceProvider = {
  provide: EmailService,
  useClass: NodemailerEmailService,
};
