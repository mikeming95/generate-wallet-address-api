import { Injectable } from '@nestjs/common';
import * as bip39 from 'bip39';


@Injectable()
export class ValidatorService {
    static isInvaildMnemonic(mnemonic: string): boolean {
        if (!bip39.validateMnemonic(mnemonic)){
            return true;
        }
        return false
    }

    static isInvaildPath(path: string): boolean {
        let regexp = new RegExp(/^(m\/)?(\d+'?\/)*\d+'?$/);
        if (!regexp.test(path)){
            return true
        }
        return false
    }

}