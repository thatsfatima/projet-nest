import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Book')
    .setDescription('Documentation API de livres')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth')
    .addTag('book')
    .addTag('review')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.use('/api/docs', async (req, res, next) => {
    if (req.path === '/api/docs') {
      return next();
    }
    const guard = new JwtAuthGuard();
    const canActivate = await guard.canActivate({
      switchToHttp: () => ({ getRequest: () => req }),
    } as ExecutionContext);

    if (!canActivate) {
      return res.status(401).json({ message: 'Non Connecté' });
    }
    next();
  });
  
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}

bootstrap();