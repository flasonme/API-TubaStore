import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { VariantSize } from '@modules/variant/consts/variant.const';

export class CreateVariantDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsIn([...Object.values(VariantSize)])
  @IsNotEmpty()
  size: VariantSize;

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
