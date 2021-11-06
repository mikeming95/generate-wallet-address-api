import { BadRequestException } from '@nestjs/common';

export class MNInvalidException extends BadRequestException {
  constructor(error?: string) {
    super('Invalid m/n', error);
  }
}