import {
  Column,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { AbstractModel } from '@common/abstract.model';
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
export default class Cart extends AbstractModel<CartDto> implements ICart {
  @PrimaryKey
  @Column
  user_id: string;

  @PrimaryKey
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
