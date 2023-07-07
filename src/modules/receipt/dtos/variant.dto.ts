import { AbstractDto } from '@common/dto/abstract.dto';
import { IReceipt } from '@modules/receipt/interfaces/receipt.interface';
import Receipt from '@modules/receipt/models/receipt.model';
import {
  ReceiptSize,
  ReceiptStatus,
} from '@modules/receipt/consts/receipt.const';

export type ReceiptDtoOptions = Partial<{ isActive?: boolean }>;

export class ReceiptDto extends AbstractDto implements IReceipt {
  id?: string;
  product_id: string;
  size: ReceiptSize;
  color: string;
  price: number;
  stock: number;
  images: Array<string>;
  status: ReceiptStatus;
  created_at: Date;
  updated_at: Date;

  constructor(variable: Receipt, options?: ReceiptDtoOptions) {
    super(variable);
    this.id = variable.id;
    this.product_id = variable.product_id;
    this.size = variable.size;
    this.color = variable.color;
    this.price = variable.price;
    this.stock = variable.stock;
    this.images = variable.images;
    this.status = variable.status;
    this.created_at = variable.created_at;
    this.updated_at = variable.updated_at;
  }
}
