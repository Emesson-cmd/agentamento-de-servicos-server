import { Module } from '@nestjs/common';
import { WebModule } from './infra/web/web.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    WebModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
