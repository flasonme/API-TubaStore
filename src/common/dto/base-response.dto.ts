import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class BaseResponseDto<T> {
  @ApiProperty()
  readonly data: T | T[] | null;

  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly code: HttpStatus;

  constructor(code: HttpStatus, data: T | T[] | null, message?: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}
