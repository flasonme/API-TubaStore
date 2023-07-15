import Cart from '@modules/cart/models/cart.model';

export enum OrderStatus {
  ORDERED = 1,
  CONFIRMED,
  DELIVERING,
  DELIVERED,
  CANCELLED,
  COMPLETED,
}

export enum PaymentMethod {
  COD = 1,
  VISA_MASTERCARD,
}

export enum PaymentStatus {
  WAITING,
  PAID,
}

export type OrderedProducts = {
  carts: Cart[];
  total_price: Number;
};
