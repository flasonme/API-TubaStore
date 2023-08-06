import { TokenPayloadDto } from './token-payload.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { HttpStatus } from '@nestjs/common';
import { BaseResponseDto } from '@common/dto/base-response.dto';

export class LoginPayloadDto extends BaseResponseDto {
  data: {
    user: UserDto;
    token: TokenPayloadDto;
  };

  constructor(user: UserDto, token: TokenPayloadDto) {
    super(HttpStatus.OK, { user, token }, 'Successfully Logged In');
  }
}
