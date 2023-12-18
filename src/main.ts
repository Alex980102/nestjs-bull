import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.enableCors();

  const apiVersion = configService.get<string>('API_VERSION') || '1';
  const isNotProduction = configService.get('PRODUCTION') !== 'true';
  const serverPort = configService.get<number>('PORT') || 3000;
  const globalPrefix = `/${configService.get('API_PREFIX')}/v${apiVersion}`;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  if (isNotProduction) {
    // Crear la documentación Swagger/OpenAPI
    const config = new DocumentBuilder()
      .setTitle(configService.get('API_TITLE'))
      .setDescription(configService.get('API_DESCRIPTION'))
      .setVersion(apiVersion)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
    const apiDocsUrl = `http://localhost:${serverPort}${globalPrefix}/docs`;
    Logger.log(`Interfaz Swagger disponible en ${apiDocsUrl}`, 'Bootstrap');
  }
  const apiUrl = `http://localhost:${serverPort}${globalPrefix}`;

  try {
    // Iniciar la aplicación en el puerto especificado
    await app.listen(serverPort);
    Logger.log(`Servidor en ejecución ${apiUrl}`, 'Bootstrap');
  } catch (error) {
    Logger.error(`Error al iniciar el servidor: ${error}`, '', 'Bootstrap');
  }
}
bootstrap();
