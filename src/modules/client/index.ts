import { ClientController } from 'modules/client/controllers';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ClientController],
  exports:[],
  providers: [],
})
export class ClientModule {}
