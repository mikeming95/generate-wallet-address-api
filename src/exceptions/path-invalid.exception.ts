import { BadRequestException } from '@nestjs/common';

export class PathInvaildException extends BadRequestException {
  constructor(error?: string) {
    super('Invalid Path', error);
  }
}