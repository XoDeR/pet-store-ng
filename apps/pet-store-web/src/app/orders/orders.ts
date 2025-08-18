import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStore } from '../stores/order.store';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  orderStore = inject(OrderStore);
}
