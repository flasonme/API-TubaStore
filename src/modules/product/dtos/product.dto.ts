import { BaseDto } from '@common/dto/base.dto';
import { IProduct } from '@modules/product/interfaces/product.interface';
import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from '@modules/product/consts/product.const';
import Product from '@modules/product/models/product.model';
import { VariantDto } from '@modules/variant/dtos/variant.dto';

export type ProductDtoOptions = Partial<{ isActive?: boolean }>;

export class ProductDto extends BaseDto implements IProduct {
  id?: string;
  title?: string;
  sku?: string;
  description?: string;
  category?: ProductCategory;
  brand?: ProductBrand;
  price?: number;
  sale?: boolean;
  discount?: number;
  stock?: number;
  new?: boolean;
  images?: Array<string>;
  status?: ProductStatus;
  tags?: Array<string>;
  created_at?: Date;
  updated_at?: Date;

  variants?: Array<VariantDto>;

  constructor(product: Product, options?: ProductDtoOptions) {
    super(product);
    this.title = product.title;
    this.sku = product.sku;
    this.description = product.description;
    this.category = product.category;
    this.brand = product.brand;
    this.price = product.price;
    this.sale = product.sale;
    this.discount = product.discount;
    this.stock = product.stock;
    this.new = product.new;
    this.images = product.images;
    this.status = product.status;
    this.tags = product.tags;
    this.created_at = product.created_at;
    this.updated_at = product.updated_at;
    this.variants = product.variants?.map((variant) => variant.toDto());
  }
}
