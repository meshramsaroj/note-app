import { INestApplication } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  APP_NAME,
  SWAGGER_ROUTE,
  GLOBAL_ROUTE_PREFIX,
  SWAGGER_SCHEME,
} from './constants/app-strings';

export function setupSwagger(app: INestApplication) {
  const version = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
  ).version;
  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription('Administration User Interface for Building Blocks')
    .setBasePath(GLOBAL_ROUTE_PREFIX)
    .setSchemes(SWAGGER_SCHEME)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_ROUTE, app, document);
}
