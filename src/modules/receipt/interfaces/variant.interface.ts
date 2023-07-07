import {
  ReceiptSize,
  ReceiptStatus,
} from '@modules/receipt/consts/receipt.const';

export interface IReceipt {
  product_id: string;
  size: ReceiptSize;
  color: string;
  price: number;
  stock: number;
  images: Array<string>;
  status: ReceiptStatus;
}
