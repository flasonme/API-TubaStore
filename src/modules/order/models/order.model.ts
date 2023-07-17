import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
  Validate,
} from 'sequelize-typescript';

import { AbstractModel } from '@common/abstract.model';
import { OrderDto } from '@modules/order/dtos/order.dto';
import { UseDto } from '@decorators/use-dto.decorator';
import { IOrder } from '@modules/order/interfaces/order.interface';
import User from '@modules/user/models/user.model';
import {
  OrderedProducts,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '@modules/order/consts/order.const';

@UseDto(OrderDto)
@Table({
  tableName: 'orders',
  timestamps: true,
  paranoid: true,
})
export default class Order extends AbstractModel<OrderDto> implements IOrder {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Unique
  @Column
  order_code: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: string;

  @AllowNull(false)
  @Column(DataType.JSONB)
  products: OrderedProducts;

  @AllowNull(false)
  @Validate({ min: 0 })
  @Column
  total_price: number;

  @Default(OrderStatus.ORDERED)
  @Validate({ isIn: [Object.values(OrderStatus)] })
  @Column(DataType.SMALLINT)
  status: OrderStatus;

  @Default(PaymentMethod.COD)
  @Validate({ isIn: [Object.values(PaymentMethod)] })
  @Column(DataType.SMALLINT)
  payment_method: PaymentMethod;

  @Default(PaymentStatus.WAITING)
  @Validate({ isIn: [Object.values(PaymentStatus)] })
  @Column(DataType.SMALLINT)
  payment_status: PaymentStatus;

  @CreatedAt
  @Column
  created_at: Date;
  @UpdatedAt
  @Column
  updated_at: Date;
  @DeletedAt
  @Column
  deleted_at: Date;
}
