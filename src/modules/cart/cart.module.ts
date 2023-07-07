import { Module } from '@nestjs/common';
import Cart from '@modules/cart/models/cart.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from '@modules/cart/controllers/cart.controller';
import { CartService } from '@modules/cart/services/cart.service';

@Module({
  imports: [SequelizeModule.forFeature([Cart])],
  controllers: [CartController],
  exports: [CartService],
  providers: [CartService],
})
export class CartModule {}
