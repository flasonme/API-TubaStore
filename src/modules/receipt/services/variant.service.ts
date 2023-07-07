import { Injectable } from '@nestjs/common';
import { BaseService } from '@common/base/base.service';
import Receipt from '@modules/receipt/models/receipt.model';
import { ReceiptDto } from '@modules/receipt/dtos/receipt.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ReceiptService extends BaseService<Receipt, ReceiptDto> {
  constructor(
    @InjectModel(Receipt)
    protected readonly _receiptRepo: typeof Receipt,
  ) {
    super(_receiptRepo);
  }
}
