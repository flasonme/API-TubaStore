import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from '@modules/product/consts/product.const';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  brand?: ProductBrand;

  @IsString()
  @IsOptional()
  category?: ProductCategory;

  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @IsBoolean()
  @IsOptional()
  sale?: boolean;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  new?: boolean;

  @IsArray()
  @IsOptional()
  images?: Array<string>;

  @IsString()
  @IsOptional()
  status?: ProductStatus;

  @IsArray()
  @IsOptional()
  tags?: Array<string>;
}
