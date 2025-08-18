export const OrderStatus = {
  PENDING: 'PENDING',
  STARTED_DELIVERY: 'STARTED_DELIVERY',
  DELIVERED: 'DELIVERED',
  PAYMENT_REQUIRED: 'PAYMENT_REQUIRED',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
