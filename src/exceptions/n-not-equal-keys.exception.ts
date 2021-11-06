import { BadRequestException } from '@nestjs/common';

export class NNotEqualToKeys extends BadRequestException {
  constructor(error?: string) {
    super('n is not equal to the length of keys', error);
  }
}