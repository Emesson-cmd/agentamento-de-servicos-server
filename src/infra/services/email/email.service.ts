export abstract class EmailService {
  public abstract sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void>;
}
