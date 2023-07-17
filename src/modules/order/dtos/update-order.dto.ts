import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  OrderedProducts,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '@modules/order/consts/order.const';

export class UpdateVariableDto {
  @IsString()
  @IsNotEmpty()
  user_id?: string;

  @IsNotEmpty()
  products?: OrderedProducts;

  @IsNumber()
  @IsOptional()
  total_price?: number;

  @IsIn([...Object.values(OrderStatus)])
  @IsOptional()
  status?: OrderStatus;

  @IsIn([...Object.values(PaymentMethod)])
  @IsOptional()
  payment_method?: PaymentMethod;

  @IsIn([...Object.values(PaymentStatus)])
  @IsOptional()
  payment_status?: PaymentStatus;
}
