import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from './core/database/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
