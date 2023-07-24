import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
} from '@modules/product/consts/product.const';

export interface IProduct {
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
}
