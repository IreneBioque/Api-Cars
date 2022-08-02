import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // solo deja la data que yo estoy esperando
      whitelist: true,
      // regresa un error 400 cuando mandas una data que no esta esperando
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
