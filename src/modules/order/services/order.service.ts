import { Injectable } from '@nestjs/common';
import { BaseService } from '@common/base/base.service';
import Order from '@modules/order/models/order.model';
import { OrderDto } from '@modules/order/dtos/order.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderService extends BaseService<Order, OrderDto> {
  constructor(
    @InjectModel(Order)
    protected readonly _orderRepo: typeof Order,
  ) {
    super(_orderRepo);
  }
}
