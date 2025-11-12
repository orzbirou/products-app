import { Product } from '../models/products';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProductId: number | null;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedProductId: null
};