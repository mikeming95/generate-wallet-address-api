import { Controller, Post, Body } from '@nestjs/common';
import { AddressService } from 'modules/address/services'
import { GenerateSegWitAddressDto, GenerateMultiSigAddressDto, AddressDto } from 'modules/address/dtos'

@Controller('api/v1/address')
export class AddressController {
    /**
     * Constructor to address controller
     * @param {AddressService} _addressService coins amount represented as string
     * @param {Units} unit unit of the coins
     * @throws {Error} amount or unit is invalid
     */
    constructor(
        private readonly _addressService: AddressService,
    ) {}


    /**
     * Generate seg-wit address
     * @param {GenerateSegWitAddressDto} GenerateSegWitAddressDto 
     * @returns {AddressDto}
     */
    @Post('/seg-wit')
    async generateSegWitAddress(
        @Body() GenerateSegWitAddressDto: GenerateSegWitAddressDto,
    ):Promise<AddressDto> {        
        return this._addressService.generateSegWitAddress(GenerateSegWitAddressDto);
    }

    
    /**
     * Generate multi_sig address
     * @param {GenerateMultiSigAddressDto} GenerateMultiSigAddressDto 
     * @returns {AddressDto}
     */
    @Post('/multi-sig')
    async generateMultiSigAddress(
        @Body() GenerateMultiSigAddressDto: GenerateMultiSigAddressDto,
    ):Promise<AddressDto> {
        return this._addressService.generateMultiSigAddress(GenerateMultiSigAddressDto);
    }

}
