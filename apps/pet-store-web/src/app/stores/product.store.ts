import { signalStore, withState } from '@ngrx/signals'
import { Product } from '@prisma/client'

export interface ProductState {
  products: Product
}

const initialState = {
  products: []
}

export const ProductStore = signalStore({
  providedIn: 'root'
},
withState()
) 