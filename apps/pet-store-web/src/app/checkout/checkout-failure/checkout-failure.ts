import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-failure',
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout-failure.html',
  styleUrl: './checkout-failure.scss',
})
export class CheckoutFailure {}
