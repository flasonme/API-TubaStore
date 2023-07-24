import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { BaseService } from '@common/base/base.service';
import { Auth, UUIDParam } from '@decorators/http.decorators';
import { RoleType } from '@constants/role-type';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { PageDto } from '@common/dto/page.dto';
import { QueryOptionDto } from '@common/dto/query-options.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BaseDto } from '@common/dto/base.dto';
import { CreationAttributes } from 'sequelize';
import { IFile } from '@interfaces/file.interface';

export abstract class BaseController<
  S extends BaseService<any, DTO>,
  DTO extends BaseDto,
> {
  protected constructor(protected readonly _service: S) {}

  @Get('')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get list',
    type: PageDto,
  })
  async getList(@Query() queryOptionDto: QueryOptionDto) {
    return await this._service.getMany(queryOptionDto);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get one',
  })
  async getDetail(
    @UUIDParam('id') id: string,
    @Query() queryOptionDto: QueryOptionDto,
  ) {
    return await this._service.getById(id, queryOptionDto);
  }

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create',
  })
  async create(@Body() params: any) {
    return await this._service.create(params as CreationAttributes<any>);
  }

  @Put('/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update',
  })
  async update(
    @UUIDParam('id') id: string,
    @Body() params: any,
    @Res() res,
    @UploadedFile() avatar?: IFile,
  ) {
    return await this._service.update(id, params);
  }

  @Delete('/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete',
  })
  async delete(@UUIDParam('id') id: string) {
    return await this._service.delete(id);
  }
}
