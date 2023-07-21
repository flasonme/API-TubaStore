import {
  Column,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from '@common/base/base.model';
import { CartDto } from '@modules/cart/dtos/cart.dto';
import { UseDto } from '@decorators/use-dto.decorator';
import { ICart } from '@modules/cart/interfaces/cart.interface';
import Product from '@modules/product/models/product.model';
import Variant from '@modules/variant/models/variant.model';

@UseDto(CartDto)
@Table({
  tableName: 'carts',
  timestamps: false,
})
export default class Cart extends BaseModel<CartDto> implements ICart {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  user_id: string;

  @ForeignKey(() => Product)
  @Column
  product_id: string;

  @PrimaryKey
  @ForeignKey(() => Variant)
  @Column
  variant_id: string;

  @Default(1)
  @Column
  quantity: number;

  @Column
  price: number;
}
