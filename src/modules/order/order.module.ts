import { Module } from '@nestjs/common';
import Order from '@modules/order/models/order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from '@modules/order/controllers/order.controller';
import { OrderService } from '@modules/order/services/order.service';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  controllers: [OrderController],
  exports: [OrderService],
  providers: [OrderService],
})
export class OrderModule {}
