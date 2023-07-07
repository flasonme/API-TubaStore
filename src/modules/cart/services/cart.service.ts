import { Injectable } from '@nestjs/common';
import { BaseService } from '@common/base/base.service';
import Cart from '@modules/cart/models/cart.model';
import { CartDto } from '@modules/cart/dtos/cart.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService extends BaseService<Cart, CartDto> {
  constructor(
    @InjectModel(Cart)
    protected readonly _cartRepo: typeof Cart,
  ) {
    super(_cartRepo);
  }
}
