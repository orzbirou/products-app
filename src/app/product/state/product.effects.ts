import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { LocalStorageService } from '../services/local-storage.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure, createProduct, updateProduct, deleteProduct } from './product.actions';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private localStorageService = inject(LocalStorageService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() => {
        // Try to load from localStorage first
        const cachedProducts = this.localStorageService.loadProducts();
        
        if (cachedProducts && cachedProducts.length > 0) {
          // Return cached products
          return of(loadProductsSuccess({ products: cachedProducts }));
        }
        
        // If no cached products, load from JSON file
        return this.productService.loadProducts().pipe(
          map(products => {
            // Save to localStorage for future use
            this.localStorageService.saveProducts(products);
            return loadProductsSuccess({ products });
          }),
          catchError(error => of(loadProductsFailure({ error: error.message })))
        );
      })
    )
  );

}