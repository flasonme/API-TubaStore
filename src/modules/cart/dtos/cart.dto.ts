import { AbstractDto } from '@common/dto/abstract.dto';
import { ICart } from '@modules/cart/interfaces/cart.interface';
import Cart from '@modules/cart/models/cart.model';

export type CartDtoOptions = Partial<{ isActive?: boolean }>;

export class CartDto extends AbstractDto implements ICart {
  user_id?: string;
  product_id?: string;
  variant_id?: string;
  quantity?: number;
  price?: number;

  constructor(cart: Cart, options?: CartDtoOptions) {
    super(cart);
    this.user_id = cart.user_id;
    this.product_id = cart.product_id;
    this.variant_id = cart.variant_id;
    this.quantity = cart.quantity;
    this.price = cart.price;
  }
}
