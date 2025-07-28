import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderStore } from '../../stores/order.store';

@Component({
  selector: 'app-checkout-success',
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss',
})
export class CheckoutSuccess implements OnInit {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);

  ngOnInit() {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (!orderId) {
      this.orderStore.setError('No order ID found');
      return;
    }
    this.orderStore.getOrder(orderId).subscribe();
  }
}
