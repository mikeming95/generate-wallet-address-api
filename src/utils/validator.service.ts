import { Injectable } from '@nestjs/common';
import * as bip39 from 'bip39';


@Injectable()
export class ValidatorService {
    /**
     * isInvaildMnemonic
     * @param   {string} mnemonic  
     * @returns {boolean} 
     */
    static isInvaildMnemonic(mnemonic: any): boolean {
        if (typeof(mnemonic) !== "string"){
            return true
        }
        if (!bip39.validateMnemonic(mnemonic)){
            return true;
        }
        return false
    }

    /**
     * isInvaildPath
     * @param   {string} path  
     * @returns {boolean} 
     */
    static isInvaildPath(path: any): boolean {
        if (typeof(path) !== "string"){
            return true
        }
        if (path.length < 1){
            return true
        }
        let regexp = new RegExp(/^(m\/)?(\d+'?\/)*\d+'?$/);
        if (!regexp.test(path)){
            return true
        }
        return false
    }
}