import { ClientController } from 'modules/client/controllers';
import { ClientService } from 'modules/client/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ClientController],
  exports:[],
  providers: [ClientService],
})
export class ClientModule {}
