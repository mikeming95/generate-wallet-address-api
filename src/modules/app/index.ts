import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from 'modules/address'
import { ClientModule } from 'modules/client'
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    AddressModule,
    ClientModule,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
export * from './app.service';
