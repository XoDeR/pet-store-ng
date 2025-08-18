import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class OrderItemInput {
  @Field(() => String)
  productId!: string;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Float)
  price!: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => [OrderItemInput])
  items!: OrderItemInput[];

  @Field(() => Float)
  totalAmount!: number;

  // Not used currently
  // @Field(() => String)
  // token!: string;
}

export interface CreateOrderServiceDto {
  items: OrderItemInput[];
  totalAmount: number;
  userId?: string;
}
