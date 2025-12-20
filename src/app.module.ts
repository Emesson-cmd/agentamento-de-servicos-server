import { Module } from '@nestjs/common';
import { WebModule } from './infra/web/web.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    WebModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
