import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@prisma/client';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
  }
}
