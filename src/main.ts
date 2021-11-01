import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common'
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  // const options = new DocumentBuilder()
  //       .setTitle('Wallet address generate API')
  //       .setDescription('API for generating wallet address')
  //       .setVersion('1.0.0')
  //       .addTag('address')
  //       .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api-docs', app, document);

  app.enable('trust proxy');
  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: { target: false },
    }),
  );
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
void bootstrap();
