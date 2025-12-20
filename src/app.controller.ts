import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './infra/web/auth/decorators/is-public.decorator';

@Controller('/')
export class AppController {
  @IsPublic()
  @Get()
  public handle(): string {
    return 'Hello World!';
  }
}
