import { HttpStatus } from '@nestjs/common';
import { CustomException } from './general.exception';

export class InvalidLengthException extends CustomException {
  constructor() {
    super('Error: invalid length.', HttpStatus.NOT_FOUND);
  }
}