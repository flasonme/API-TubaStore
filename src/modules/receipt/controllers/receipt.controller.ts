import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@common/base/base.controller';
import { ReceiptService } from '@modules/receipt/services/receipt.service';
import { ReceiptDto } from '@modules/receipt/dtos/receipt.dto';
import { Auth, UUIDParam } from '@decorators/http.decorators';
import { RoleType } from '@constants/role-type';
import { ApiPageOkResponse } from '@decorators/api-page-ok-response.decorator';
import { PageDto } from '@common/dto/page.dto';
import { QueryOptionDto } from '@common/dto/query-options.dto';
import { CreateReceiptDto } from '@modules/receipt/dtos/create-receipt.dto';

@Controller('receipt')
@ApiTags('receipt')
export class ReceiptController extends BaseController<
  ReceiptService,
  ReceiptDto
> {
  constructor(readonly _service: ReceiptService) {
    super(_service);
  }

  @Get()
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
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Get one',
  })
  async getDetail(
    @UUIDParam('id') id: string,
    @Query() queryOptionDto: QueryOptionDto,
  ) {
    const result = await this._service.getById(id, queryOptionDto);
    return result;
  }

  @Post()
  @Auth([RoleType.USER], { public: true })
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Create',
  })
  async create(@Body() params: CreateReceiptDto) {
    console.log('PARAM ======>', params);
    return await this._service.create(params);
  }

  @Put('/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Update',
  })
  async update(@UUIDParam('id') id: string, @Body() params: ReceiptDto) {
    return await this._service.update(id, params);
  }

  @Delete('/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Delete',
  })
  async delete(@UUIDParam('id') id: string) {
    return await this._service.delete(id);
  }
}
