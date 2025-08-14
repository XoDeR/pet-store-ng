import { inject, Injectable } from '@angular/core';
import { CartStore } from '../stores/cart.store';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth';
import { from, switchMap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Stripe {
  cartStore = inject(CartStore);
  http = inject(HttpClient);
  auth = inject(AuthService);

  createCheckoutSession() {
    const items = this.cartStore.items();
    const totalAmount = this.cartStore.totalAmount();

    return from(this.auth.getToken()).pipe(
      switchMap((token) =>
        this.http.post<{ url: string }>(
          `${environment.apiUrl}/api/checkout`,
          {
            items: items.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              stripePriceId: item.stripePriceId,
            })),
            totalAmount,
          },
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        )
      )
    );
  }
}
