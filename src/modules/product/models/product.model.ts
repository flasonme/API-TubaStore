import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  HasMany,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
  Validate,
} from 'sequelize-typescript';

import { BaseModel } from '@common/base/base.model';
import { ProductDto } from '@modules/product/dtos/product.dto';
import { UseDto } from '@decorators/use-dto.decorator';
import { IProduct } from '@modules/product/interfaces/product.interface';
import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from '@modules/product/consts/product.const';
import Variant from '@modules/variant/models/variant.model';

@UseDto(ProductDto)
@Table({
  tableName: 'products',
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  attributes: {
    exclude: ['deleted_at'],
  },
  include: ['variants'],
}))
export default class Product extends BaseModel<ProductDto> implements IProduct {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Default('New Product')
  @Column
  title: string;

  @Unique(true)
  @Column
  sku: string;

  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  category: ProductCategory;

  @Default(ProductBrand.NO_BRAND)
  @Column
  brand: ProductBrand;

  @Default(0)
  @Validate({ min: 0 })
  @Column
  price: number;

  @Default(false)
  @Column
  sale: boolean;

  @Default(0)
  @Validate({ min: 0 })
  @Column
  discount: number;

  @Default(1)
  @Validate({ min: 0 })
  @Column
  stock: number;

  @Default(true)
  @Column
  new: boolean;

  @Column(DataType.ARRAY(DataType.STRING))
  images: Array<string>;

  @Default(ProductStatus.ACTIVE)
  @Column
  status: ProductStatus;

  @Column(DataType.ARRAY(DataType.STRING))
  tags: Array<string>;

  @CreatedAt
  @Column
  created_at: Date;
  @UpdatedAt
  @Column
  updated_at: Date;
  @DeletedAt
  @Column
  deleted_at: Date;

  @HasMany(() => Variant)
  variants: Variant[];
}
