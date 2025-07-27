import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../stores/cart.store';
import { Stripe } from '../services/stripe';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  cartStore = inject(CartStore);
  stripeService = inject(Stripe);

  checkout() {
    this.stripeService.createCheckoutSession().subscribe(({ url }) => {
      location.href = url;
    });
  }
}
