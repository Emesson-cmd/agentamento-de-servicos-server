import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { EmailService } from '../email.service';
import { ServiceException } from '../../exceptions/service.exception';

export interface SendEmailDTO {
  to: string | string[];
  subject: string;
  html: string;
}

@Injectable()
export class ResendEmailService extends EmailService {
  private readonly resend: Resend;

  constructor() {
    super();

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new ServiceException(
        'Missing RESEND_API_KEY',
        'Erro ao enviar email',
        ResendEmailService.name,
      );
    }

    this.resend = new Resend(apiKey);
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    try {
      await this.resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: 'Redefinição de senha',
        html: `
          <p>Você solicitou a redefinição de senha.</p>
          <p>Seu token:</p>
          <strong>${resetToken}</strong>
        `,
      });
    } catch (error) {
      const err = error as Error;

      throw new ServiceException(
        `Failed to send email: ${err.message}`,
        'Houve um erro ao enviar o email',
        ResendEmailService.name,
      );
    }
  }
}
