import { Injectable } from '@nestjs/common';
import { CryptoService } from 'utils';
import { DemoPageDto } from '../dtos'

@Injectable()
export class ClientService {
    /**
     * Get demo page parameter
     * @returns {DemoPageDto} publicKey:string
     */
    public async getDemoPage():Promise<DemoPageDto>{
        const publicKey = CryptoService.GetRsaPublicKey()
        return new DemoPageDto(publicKey)
    }
}