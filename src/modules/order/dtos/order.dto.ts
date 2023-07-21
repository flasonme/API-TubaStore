import { BaseDto } from '@common/dto/base.dto';
import { IOrder } from '@modules/order/interfaces/order.interface';
import Order from '@modules/order/models/order.model';
import {
  OrderedProducts,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '@modules/order/consts/order.const';

export type OrderDtoOptions = Partial<{ isActive?: boolean }>;

export class OrderDto extends BaseDto implements IOrder {
  id?: string;
  order_code?: string;
  user_id?: string;
  products?: OrderedProducts;
  total_price?: number;
  status?: OrderStatus;
  payment_method?: PaymentMethod;
  payment_status?: PaymentStatus;
  created_at: Date;
  updated_at: Date;

  constructor(order: Order, options?: OrderDtoOptions) {
    super(order);
    this.id = order.id;
    this.order_code = order.order_code;
    this.user_id = order.user_id;
    this.products = order.products;
    this.total_price = order.total_price;
    this.status = order.status;
    this.payment_method = order.payment_method;
    this.payment_status = order.payment_status;
    this.created_at = order.created_at;
    this.updated_at = order.updated_at;
  }
}
