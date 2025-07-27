import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { OrdersService } from '../orders/orders.service';
import { Stripe } from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET;

if (!stripeSecret) {
  throw new Error('Missing stripe secret');
}

const stripe = new Stripe(stripeSecret);

@Injectable()
export class CheckoutService {
  constructor(private ordersService: OrdersService) {}

  async create(createCheckoutDto: CreateCheckoutDto) {
    const order = await this.ordersService.create({
      items: createCheckoutDto.items,
      totalAmount: createCheckoutDto.totalAmount,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: createCheckoutDto.items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
      })),
    });

    return 'This action adds a new checkout';
  }
}
