import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug', 'verbose'] });

  app.enableCors({ origin: 'http://localhost:3100' });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Campus Issue Management Backend API') // Nome da API
    .setDescription('CIM Backend API endpoints') // Descrição da API
    .setVersion('1.0') // Versão
    .addBearerAuth() // Adiciona suporte para autenticação via Bearer Token (opcional)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // 'api-docs' é o endpoint da documentação

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger docs available at: http://localhost:3000/api-docs');
}
bootstrap();
