import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const corsOptions = {
    origin: ['http://localhost:4200']
  }
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
