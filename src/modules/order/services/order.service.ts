import { Injectable } from '@nestjs/common';
import { BaseService } from '@common/base/base.service';
import Order from '@modules/order/models/order.model';
import { OrderDto } from '@modules/order/dtos/order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { CreateOrderDto } from '@modules/order/dtos/create-order.dto';

@Injectable()
export class OrderService extends BaseService<Order, OrderDto> {
  constructor(
    @InjectModel(Order)
    protected readonly _orderRepo: Repository<Order>,
  ) {
    super(_orderRepo);
  }

  async create(data: CreateOrderDto): Promise<OrderDto> {
    const transaction = await this._orderRepo.sequelize.transaction();
    const result = await this._repository.create<Order>({
      ...data,
    });
    return result?.toDto();
  }
}
