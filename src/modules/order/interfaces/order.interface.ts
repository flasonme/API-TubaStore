import type { OrderedProducts } from '@modules/order/consts/order.const';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '@modules/order/consts/order.const';

export interface IOrder {
  order_code?: string;
  user_id?: string;
  products?: OrderedProducts[];
  total_price?: number;
  status?: OrderStatus;
  payment_method?: PaymentMethod;
  payment_status?: PaymentStatus;
}
