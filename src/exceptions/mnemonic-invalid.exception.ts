import { BadRequestException } from '@nestjs/common';

export class MnemonicInvaildException extends BadRequestException {
  constructor(error?: string) {
    super('Invalid Mnemonic', error);
  }
}