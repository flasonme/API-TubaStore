import { TokenPayloadDto } from './token-payload.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { HttpStatus } from '@nestjs/common';

export class LoginPayloadDto {
  // @ApiProperty()
  statusCode: HttpStatus;

  // @ApiProperty({ type: Symbol, required: false })
  msg?: string;

  // @ApiProperty({
  //   type: {
  //     user: UserDto,
  //     token: TokenPayloadDto,
  //   },
  // })
  data: {
    user: UserDto;
    token: TokenPayloadDto;
  };

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.statusCode = HttpStatus.OK;
    this.msg = 'Successfully Logged In';
    this.data = {
      user,
      token,
    };
  }
}
