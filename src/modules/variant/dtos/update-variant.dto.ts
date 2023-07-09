import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  VariantSize,
  VariantStatus,
} from '@modules/variant/consts/variant.const';

export class UpdateVariableDto {
  @IsIn([...Object.values(VariantSize)])
  @IsOptional()
  size: VariantSize;

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

  @IsIn([...Object.values(VariantStatus)])
  @IsOptional()
  status: VariantStatus;
}
