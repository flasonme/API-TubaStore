import {
  VariantSize,
  VariantStatus,
} from '@modules/variant/consts/variant.const';

export interface IVariant {
  product_id: string;
  size: VariantSize;
  color: string;
  price: number;
  stock: number;
  images: Array<string>;
  status: VariantStatus;
}
