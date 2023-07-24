import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@common/base/base.controller';
import { ProfileService } from '@modules/user/sub_modules/profile/services/profile.service';
import { ProfileDto } from '@modules/user/sub_modules/profile/dtos/profile.dto';
import { ApiFile } from '@decorators/swagger.schema';
import { IFile } from '@interfaces/file.interface';
import { UUIDParam } from '@decorators/http.decorators';
import { UpdateProfileDto } from '@modules/user/sub_modules/profile/dtos/update-profile.dto';
import { FilesService } from '@shared/services/files.service';

@Controller('profile')
@ApiTags('profile')
export class ProfileController extends BaseController<
  ProfileService,
  ProfileDto
> {
  constructor(
    protected readonly _service: ProfileService,
    private filesService: FilesService,
  ) {
    super(_service);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiFile({ name: 'avatar' }, { isRequired: false })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ProfileDto, description: 'Successfully Update' })
  async update(
    @UUIDParam('id') id: string,
    @Body() data: UpdateProfileDto,
    @Res() res,
    @UploadedFile() avatar?: IFile,
  ): Promise<ProfileDto> {
    if (avatar) {
      const uploadConfig = this.filesService.getUploadConfig(avatar.fieldName);
      data.avatar = uploadConfig.url + avatar.filename;
    }
    const result = await this._service.update(id, data);
    return res.status(HttpStatus.OK).send({ data: result });
  }
}
