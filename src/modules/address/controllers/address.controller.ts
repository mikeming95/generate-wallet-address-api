import { Controller, Post } from '@nestjs/common';
import { AddressService } from 'modules/address/services'

@Controller('api/v1/address')
export class AddressController {
    constructor(
        private readonly _addressService: AddressService,
    ) {}

    @Post('/seg-wit')
    generate(): string {
    return 'This action adds a new cat';
    }

    

    @Post('/multi-sig')
    create(): string {
    return 'This action adds a new dog';
    }

}
