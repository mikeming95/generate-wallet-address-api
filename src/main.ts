import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { join } from 'path';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.enable('trust proxy');
  app.use(helmet());
  app.use(compression());
  app.useStaticAssets(join(__dirname, '..', 'src/static'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
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
