import { BaseDto } from '@common/dto/base.dto';
import { IVariant } from '@modules/variant/interfaces/variant.interface';
import Variant from '@modules/variant/models/variant.model';
import {
  VariantSize,
  VariantStatus,
} from '@modules/variant/consts/variant.const';

export type VariantDtoOptions = Partial<{ isActive?: boolean }>;

export class VariantDto extends BaseDto implements IVariant {
  id?: string;
  product_id: string;
  size: VariantSize;
  color: string;
  price: number;
  stock: number;
  images: Array<string>;
  status: VariantStatus;
  created_at: Date;
  updated_at: Date;

  constructor(variable: Variant, options?: VariantDtoOptions) {
    super(variable);
    this.id = variable.id;
    this.product_id = variable.product_id;
    this.size = variable.size;
    this.color = variable.color;
    this.price = variable.price;
    this.stock = variable.stock;
    this.images = variable.images;
    this.status = variable.status;
    this.created_at = variable.created_at;
    this.updated_at = variable.updated_at;
  }
}
