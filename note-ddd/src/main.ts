import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { GLOBAL_ROUTE_PREFIX } from './constants/app-strings';

async function bootstrap() {
  const server = new ExpressAdapter(express());
  const app = await NestFactory.create(AppModule, server);
  app.setGlobalPrefix(GLOBAL_ROUTE_PREFIX);
  app.enableCors();
  setupSwagger(app);
  await app.listen(8000);
}
bootstrap();
