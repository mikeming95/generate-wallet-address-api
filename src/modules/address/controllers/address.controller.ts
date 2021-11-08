import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AddressService } from '../services'
import { AddressDto, RsaDataDto } from '../dtos'

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
    @HttpCode(200)
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
    @HttpCode(200)
    async generateMultiSigAddress(
        @Body() RsaDataDto: RsaDataDto,
    ):Promise<AddressDto> {
        return this._addressService.generateMultiSigAddress(RsaDataDto);
    }

}
