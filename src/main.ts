import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  const config = new DocumentBuilder()
    .setTitle('00loja documentation')
    .setDescription('Endpoint description of 00loja REST BackEnd')
    .setVersion('0.1.0')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic'
    })
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .addTag('auth')
    .addTag('users')
    // .addTag('categories')
    // .addTag('products')
    // .addTag('order')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
