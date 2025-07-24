import { afterNextRender, Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ProductStore } from '../stores/product.store';

@Component({
  selector: 'app-products',
  imports: [CommonModule, JsonPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  productStore = inject(ProductStore);

  constructor() {
    afterNextRender(() => {
      this.productStore.loadProducts();
    });
  }
}
