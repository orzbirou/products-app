import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectSelectedProductId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
  selectAllProducts,
  selectSelectedProductId,
  (products, selectedId) => {
    if (selectedId === null) return null;
    if (selectedId === 0) {
      // Return empty product for new product mode
      return {
        id: 0,
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        creationDate: new Date()
      };
    }
    return products.find(p => p.id === selectedId) || null;
  }
);