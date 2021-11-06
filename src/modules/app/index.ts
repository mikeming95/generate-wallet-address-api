import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from 'modules/address'
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    AddressModule,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
export * from './app.service';
