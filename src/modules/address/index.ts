import { Module } from '@nestjs/common';
import { AddressController } from './controllers';
import { AddressService } from './services'

@Module({
  imports: [],
  controllers: [AddressController],
  exports:[AddressService],
  providers: [AddressService],
})
export class AddressModule {}