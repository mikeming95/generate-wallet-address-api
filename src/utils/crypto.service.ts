import * as nodeRSA from 'node-rsa';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
const publiKey = fs.readFileSync(process.cwd()+"/src/keys/rsa_public_key.pem").toString('ascii')
const privateKey = fs.readFileSync(process.cwd()+'/src/keys/rsa_private_key.pem').toString('ascii')

@Injectable()
export class CryptoService {
    static rsaDecryptor = new nodeRSA(privateKey);
    static rsaEncryptor = new nodeRSA(publiKey);

    /**
     * Generate Rsa Decrypt 
     * @param   {string} data  
     * @returns {string} decryptData
     */
    static RsaDecrypt(data: string): string{
        try{
            this.rsaDecryptor.setOptions({encryptionScheme: 'pkcs1'});
            const decryptData = this.rsaDecryptor.decrypt(data,"utf8").toString();
            return decryptData
        }catch{
            return ""
        }
    }

    /**
     * Generate RsaEncrypt
     * @param   {string} data  
     * @returns {string} encryptData
     */
    static RsaEncrypt(data: string): string {
        this.rsaEncryptor.setOptions({encryptionScheme: 'pkcs1'});
        const encryptData = this.rsaEncryptor.encrypt(data,"base64");
        return encryptData
    }

    /**
     * return publiKey
     * @returns {string} public key
     */
    static GetRsaPublicKey(): string {
        return publiKey
    }


}