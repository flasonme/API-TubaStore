import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import User from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginPayloadDto } from '../dtos/login-payload.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { FilesService } from '@shared/services/files.service';
import { UserDto } from '@modules/user/dtos/user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private filesService: FilesService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(@Body() userLoginDto: any): Promise<LoginPayloadDto> {
    console.log('userLoginDto', userLoginDto);
    const user = await this.authService.validateUser(userLoginDto);

    const token = this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });

    return new LoginPayloadDto(user.toDto(), token);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  // @ApiFile({ name: 'avatar' }, { isRequired: false })
  // @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @Res() res,
    // @UploadedFile() avatar?: IFile,
  ): Promise<UserDto> {
    // if (avatar) {
    //   const uploadConfig = this.filesService.getUploadConfig(avatar.fieldName);
    //   userRegisterDto.avatar = uploadConfig.url + avatar.filename;
    // }
    const createdUser = await this.userService.create(userRegisterDto);
    return res.status(HttpStatus.CREATED).send({ data: createdUser });
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: User, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserDto, @Res() res) {
    return res.status(HttpStatus.OK).send({ data: user });
  }
}
