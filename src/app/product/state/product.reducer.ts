import { createReducer, on, ActionReducer } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsFailure, selectProduct, updateProduct, createProduct, deleteProduct } from './product.actions';
import { initialState, ProductState } from './product.state';
import { LocalStorageService } from '../services/local-storage.service';

const localStorageService = new LocalStorageService();

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadProductsSuccess, (state, { products }) => {
    const newState = {
      ...state,
      products,
      loading: false,
      error: null
    };
    localStorageService.saveProducts(newState.products);
    return newState;
  }),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(selectProduct, (state, { productId }) => ({
    ...state,
    selectedProductId: productId
  })),
  on(updateProduct, (state, { product }) => {
    const newState = {
      ...state,
      products: state.products.map(p => p.id === product.id ? product : p),
      selectedProductId: null
    };
    localStorageService.saveProducts(newState.products);
    return newState;
  }),
  on(createProduct, (state, { product }) => {
    const newState = {
      ...state,
      products: [...state.products, product],
      selectedProductId: null
    };
    localStorageService.saveProducts(newState.products);
    return newState;
  }),
  on(deleteProduct, (state, { productId }) => {
    const newState = {
      ...state,
      products: state.products.filter(p => p.id !== productId),
      selectedProductId: state.selectedProductId === productId ? null : state.selectedProductId
    };
    localStorageService.saveProducts(newState.products);
    return newState;
  })
);