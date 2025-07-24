import { afterNextRender, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../stores/product.store';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  productStore = inject(ProductStore);

  constructor() {
    afterNextRender(() => {
      this.productStore.loadProducts();
    })
  }
}
