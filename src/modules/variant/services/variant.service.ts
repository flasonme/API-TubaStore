import { Injectable } from '@nestjs/common';
import { BaseService } from '@common/base/base.service';
import Variant from '@modules/variant/models/variant.model';
import { VariantDto } from '@modules/variant/dtos/variant.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VariantService extends BaseService<Variant, VariantDto> {
  constructor(
    @InjectModel(Variant)
    protected readonly _variantRepo: typeof Variant,
  ) {
    super(_variantRepo);
  }
}
