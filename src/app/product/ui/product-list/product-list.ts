import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductCard } from "../product-card/product-card";
import { ProductListToolbar } from "../product-list-toolbar/product-list-toolbar";
import { Product } from '../../models/products';
import { selectAllProducts, selectProductsLoading, selectProductsError } from '../../state/product.selectors';
import { selectProduct } from '../../state/product.actions';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, ProductListToolbar, AsyncPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  allProducts$: Observable<Product[]>;
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  totalPages$: Observable<number>;
  
  currentPage = 1;
  pageSize = 5;
  private searchTerm = '';
  private sortBy = '';

  constructor(private store: Store, private router: Router) {
    this.allProducts$ = this.store.select(selectAllProducts);
    this.products$ = this.allProducts$;
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
    this.totalPages$ = this.allProducts$.pipe(map(() => 1));
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  onSearchChanged(searchTerm: string): void {
    this.searchTerm = searchTerm.toLowerCase();
    this.currentPage = 1;
    this.applyFilters();
  }

  onSortChanged(sortBy: string): void {
    this.sortBy = sortBy;
    this.currentPage = 1;
    this.applyFilters();
  }

  onAddProduct(): void {
    this.store.dispatch(selectProduct({ productId: 0 }));
    this.router.navigate(['/products', 'new']);
  }

  nextPage(): void {
    this.currentPage++;
    this.applyFilters();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  private applyFilters(): void {
    const filtered$ = this.allProducts$.pipe(
      map(products => {
        let filtered = [...products];

        // Apply search filter
        if (this.searchTerm) {
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(this.searchTerm) ||
            product.description.toLowerCase().includes(this.searchTerm)
          );
        }

        // Apply sorting
        if (this.sortBy === 'name') {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.sortBy === 'date') {
          filtered.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
        }

        return filtered;
      })
    );

    // Calculate total pages
    this.totalPages$ = filtered$.pipe(
      map(filtered => Math.ceil(filtered.length / this.pageSize))
    );

    // Apply pagination
    this.products$ = filtered$.pipe(
      map(filtered => {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return filtered.slice(startIndex, endIndex);
      })
    );
  }
}
