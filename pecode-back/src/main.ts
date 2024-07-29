import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PostsModule } from './posts/posts.module';

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API documentation for the blog application')
    .setVersion('1.0')
    .addTag('posts')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}

bootstrap();
