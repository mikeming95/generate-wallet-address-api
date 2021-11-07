import { ForbiddenException, Injectable } from '@nestjs/common';
import { GenerateMultiSigAddressDto, AddressDto, RsaDataDto } from 'modules/address/dtos'
import * as bitcoin from 'bitcoinjs-lib'
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import { MnemonicInvaildException, PathInvaildException, MNInvalidException, NNotEqualToKeys, AddressInvalidException} from 'exceptions'
import { ValidatorService , CryptoService } from 'utils';

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
        RsaDataDto: RsaDataDto,
     ):Promise<AddressDto>{
        const{ data } = RsaDataDto
        const jsonText = CryptoService.RsaDecrypt(data)
        //can not decrypt
        if (!jsonText){
            throw new ForbiddenException()
        }
        const responseJson = JSON.parse(jsonText);
        const { mnemonic, path } = responseJson
        //invalid mnemonic
        if (ValidatorService.isInvaildMnemonic(mnemonic)){
            throw new MnemonicInvaildException();
        }
        //invalid path
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
     * @param   {RsaDataDto} RsaDataDto
     * @returns {AddressDto} address:string
     * @throws {MNInvalidException} m < n 
     * @throws {NNotEqualToKeys} n != keys.length
     */
    public async generateMultiSigAddress(
        RsaDataDto: RsaDataDto,
    ):Promise<AddressDto>{
        const { data } = RsaDataDto;
        const jsonText = CryptoService.RsaDecrypt(data);
        //can not decrypt
        if (!jsonText){
            throw new ForbiddenException();
        }
        const responseJson = JSON.parse(jsonText);
        const {addresses, m , n  } = responseJson;
        if ((typeof(m) !== "number")||(typeof(n) !== "number")||(m > n)){
            throw new MNInvalidException();
        }
        if (n !== addresses.length){
            throw new NNotEqualToKeys();
        }
        try{
            let pubkeys: Buffer[] = addresses
            .filter(pk => pk.length > 0)
            .map(hex => Buffer.from(hex, 'hex'));
            const { address } = bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2ms({ m, pubkeys }),
            })
            return new AddressDto(address);
        }catch{
            throw new AddressInvalidException();
        }
        
        
    }
}