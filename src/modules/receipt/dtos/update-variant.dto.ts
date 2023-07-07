import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReceiptSize } from '@modules/receipt/consts/receipt.const';

export class UpdateVariableDto {
  @IsIn([...Object.values(ReceiptSize)])
  @IsOptional()
  size: ReceiptSize;

  @IsString()
  @IsOptional()
  color: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsOptional()
  images: Array<string>;

  @IsOptional()
  status: string;
}
