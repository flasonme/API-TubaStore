import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  PrimaryKey,
  Table,
  UpdatedAt,
  Validate,
} from 'sequelize-typescript';

import { BaseModel } from '@common/base/base.model';
import { VariantDto } from '@modules/variant/dtos/variant.dto';
import { UseDto } from '@decorators/use-dto.decorator';
import { IVariant } from '@modules/variant/interfaces/variant.interface';
import Product from '@modules/product/models/product.model';
import {
  VariantSize,
  VariantStatus,
} from '@modules/variant/consts/variant.const';

@UseDto(VariantDto)
@Table({
  tableName: 'variants',
  timestamps: true,
  paranoid: true,
})
export default class Variant extends BaseModel<VariantDto> implements IVariant {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  product_id: string;

  @AllowNull(false)
  @Validate({
    isIn: [[...Object.values(VariantSize)]],
  })
  @Column
  size: VariantSize;

  @AllowNull(false)
  @Column
  color: string;

  @Column
  price: number;

  @Default(1)
  @Validate({ min: 1 })
  @Column
  stock: number;

  @Default([])
  @Column(DataType.ARRAY(DataType.STRING))
  images: Array<string>;

  @Default(VariantStatus.ACTIVE)
  @Validate({
    isIn: [[...Object.values(VariantStatus)]],
  })
  @Column
  status: VariantStatus;

  @CreatedAt
  @Column
  created_at: Date;
  @UpdatedAt
  @Column
  updated_at: Date;
  @DeletedAt
  @Column
  deleted_at: Date;

  @BelongsTo(() => Product)
  product: Product;
}
