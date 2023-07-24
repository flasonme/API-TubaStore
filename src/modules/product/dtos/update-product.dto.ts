import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from '@modules/product/consts/product.const';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
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
  @IsOptional()
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
