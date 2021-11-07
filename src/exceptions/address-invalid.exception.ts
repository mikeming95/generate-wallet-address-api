import { BadRequestException } from '@nestjs/common';

export class AddressInvalidException extends BadRequestException {
  constructor(error?: string) {
    super('Invalid address', error);
  }
}