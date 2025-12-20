import { ZodError } from 'zod';

export class ZodUtils {
  public static formatZodError(error: ZodError): string {
    const message = error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(';\n ');
    return message;
  }
}
