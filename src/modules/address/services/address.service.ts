import { Injectable, BadRequestException } from '@nestjs/common';
import { GenerateSegWitAddressDto, GenerateMultiSigAddressDto, AddressDto } from 'modules/address/dtos'
import * as bitcoin from 'bitcoinjs-lib'
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import { MnemonicInvaildException, PathInvaildException, MNInvalidException, NNotEqualToKeys} from 'exceptions'
import { ValidatorService } from 'utils/validator.service';

@Injectable()
export class AddressService {
    /**
     * Generate seg-wit address
     * @param   {GenerateSegWitAddressDto} GenerateSegWitAddressDto  seed:string && path:string
     * @returns {AddressDto} address:string
     * @throws  {MnemonicInvaildException} mnemonic is invalid
     * @throws  {PathInvaildException} path is invalid
     */
    public async generateSegWitAddress(
       GenerateSegWitAddressDto: GenerateSegWitAddressDto,
    ):Promise<AddressDto>{
        const{ seed, path } = GenerateSegWitAddressDto
        const mnemonic = seed.join(" ");
        if (ValidatorService.isInvaildMnemonic(mnemonic)){
            throw new MnemonicInvaildException();
        }
        if (ValidatorService.isInvaildPath(path)){
            throw new PathInvaildException();
        }
        const seedBuffer = bip39.mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seedBuffer)
        const bip32Interface = root.derivePath(path)
        const { address } = bitcoin.payments.p2wpkh({
            pubkey: bip32Interface.publicKey,
        })
        return new AddressDto(address)
    }


    /**
     * Generate multi-sig address
     * @param   {GenerateMultiSigAddressDto} GenerateMultiSigAddressDto
     * @returns {AddressDto} address:string
     * @throws {MNInvalidException} m < n 
     * @throws {NNotEqualToKeys} n != keys.length
     */
    public async generateMultiSigAddress(
        GenerateMultiSigAddressDto: GenerateMultiSigAddressDto,
    ):Promise<AddressDto>{
        const{ keys, m , n } = GenerateMultiSigAddressDto
        if (m > n){
            throw new MNInvalidException();
        }
        if (n !== keys.length){
            throw new NNotEqualToKeys();
        }

        let pubkeys: Buffer[] = keys
        .filter(pk => pk.length > 0)
        .map(hex => Buffer.from(hex, 'hex'));
        const { address } = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({ m, pubkeys }),
        })
        return new AddressDto(address)
    }
}