import { Controller, Post, Body ,Request } from '@nestjs/common';
import { AddressService } from 'modules/address/services'
import { GenerateSegWitAddressDto, GenerateMultiSigAddressDto, AddressDto, RsaDataDto } from 'modules/address/dtos'
import { ValidatorService , CryptoService } from 'utils';

@Controller('api/v1/address')
export class AddressController {
    /**
     * Constructor to address controller
     * @param {AddressService} _addressService 
     */
    constructor(
        private readonly _addressService: AddressService,
    ) {}

    /**
     * Generate seg-wit address
     * @param {RsaDataDto} RsaDataDto 
     * @returns {AddressDto}
     */
    @Post('/seg-wit')
    async generateSegWitAddress(
        @Body() RsaDataDto: RsaDataDto,
    ):Promise<AddressDto> {        
        return this._addressService.generateSegWitAddress(RsaDataDto);
    }

    
    /**
     * Generate multi_sig address
     * @param {GenerateMultiSigAddressDto} GenerateMultiSigAddressDto 
     * @returns {AddressDto}
     */
    @Post('/multi-sig')
    async generateMultiSigAddress(
        @Body() RsaDataDto: RsaDataDto,
    ):Promise<AddressDto> {
        return this._addressService.generateMultiSigAddress(RsaDataDto);
    }
    // @Post('/multi-sig')
    // async generateMultiSigAddress(
    //     @Body() GenerateMultiSigAddressDto: GenerateMultiSigAddressDto,
    // ):Promise<AddressDto> {
    //     return this._addressService.generateMultiSigAddress(GenerateMultiSigAddressDto);
    // }

}
