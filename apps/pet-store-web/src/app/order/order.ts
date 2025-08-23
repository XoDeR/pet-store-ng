import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetail } from '../components/order-detail/order-detail';
import { OrderStore } from '../stores/order.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [CommonModule, OrderDetail],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class Order implements OnInit {
  orderStore = inject(OrderStore);
  route = inject(ActivatedRoute);
  getOrder = rxMethod<string>(
    pipe(switchMap((orderId) => this.orderStore.getOrder(orderId)))
  );

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (!orderId) {
      this.orderStore.setError('No order ID found');
      return;
    }
    this.getOrder(orderId);
  }
}
