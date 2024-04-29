import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { login } from './auth/infraestructure/adapters/firebase/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(8080)
  login()
}
bootstrap()
