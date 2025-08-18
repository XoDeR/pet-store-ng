import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderStore } from '../../stores/order.store';
import { OrderDetail } from '../../components/order-detail/order-detail';
import { CartStore } from '../../stores/cart.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap } from 'rxjs';
// import { OrderStatus } from '@prisma/client'; // this causes errors with prisma
// https://stackoverflow.com/questions/79545867/angular-19-with-ssr-is-not-able-to-build-with-referenceerror-dirname-is-not-d
// https://github.com/prisma/prisma/issues/22827
// Workaround:
import { OrderStatus } from '../../../extra.types';

@Component({
  selector: 'app-checkout-success',
  imports: [CommonModule, RouterLink, OrderDetail],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss',
})
export class CheckoutSuccess implements OnInit {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  cartStore = inject(CartStore);
  getAndUpdateOrder = rxMethod<string>(
    pipe(
      switchMap((orderId) => {
        return this.orderStore.getOrder(orderId);
      }),
      map((order) => {
        if (order.status === OrderStatus.PAYMENT_REQUIRED) {
          return this.orderStore.updateOrder({
            id: order.id,
            status: OrderStatus.PENDING,
          });
        }
        return null;
      })
    )
  );

  constructor() {
    afterNextRender(() => {
      this.cartStore.clearCart();
    });
  }

  ngOnInit() {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (!orderId) {
      this.orderStore.setError('No order ID found');
      return;
    }
    this.getAndUpdateOrder(orderId);
  }
}
