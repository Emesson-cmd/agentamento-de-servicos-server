import { createTransport, Transporter, SentMessageInfo } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { ServiceException } from '../../exceptions/service.exception';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

@Injectable()
export class NodemailerEmailService extends EmailService {
  private readonly transporter: Transporter<SentMessageInfo>;

  public constructor() {
    super();

    const config = this.getConfig();

    try {
      this.transporter = createTransport(config);
    } catch (error) {
      const err = error as Error;
      throw new ServiceException(
        `Error creating nodemailer transport: ${err.message}`,
        'Houve um erro ao enviar o email',
        NodemailerEmailService.name,
      );
    }
  }

  private getConfig(): EmailConfig {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
      throw new ServiceException(
        'Missing email environment variables',
        'Houve um erro ao enviar o email',
        NodemailerEmailService.name,
      );
    }

    return {
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: Number(EMAIL_PORT) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    };
  }

  public async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Your password reset token is: ${resetToken}`,
      html: `<p>Your password reset link is: <strong>${process.env.CLIENT_URL}/reset-password?token=${resetToken}</strong></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      const err = error as Error;
      throw new ServiceException(
        `Failed to send email: ${err.message}`,
        'Houve um erro ao enviar o email',
        NodemailerEmailService.name,
      );
    }
  }
}
