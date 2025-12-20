import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

const server = express();

let nestApp: any;

async function bootstrap() {
  if (!nestApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors();
    await app.init();
    nestApp = app;
  }
  return server;
}

export default async function handler(req: Request, res: Response) {
  const server = await bootstrap();
  server(req, res);
}
