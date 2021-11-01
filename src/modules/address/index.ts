import { Module } from '@nestjs/common';
import { AddressController } from 'modules/address/controllers';
import { ConfigModule } from '@nestjs/config';
import { AddressService } from 'modules/address/services'

@Module({
  imports: [],
  controllers: [AddressController],
  exports:[AddressService],
  providers: [AddressService],
})
export class AddressModule {}