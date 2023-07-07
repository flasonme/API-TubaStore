import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReceiptSize } from '@modules/receipt/consts/receipt.const';

export class CreateReceiptDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsIn([...Object.values(ReceiptSize)])
  @IsNotEmpty()
  size: ReceiptSize;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsOptional()
  images: Array<string>;

  @IsOptional()
  status: string;
}
