import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../models/products';
import { selectProduct, deleteProduct } from '../../state/product.actions';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input<Product>();

  constructor(private store: Store, private router: Router) {}

  onCardClick(): void {
    const product = this.product();
    if (product) {
      this.store.dispatch(selectProduct({ productId: product.id }));
      this.router.navigate(['/products', product.id]);
    }
  }

  onDeleteClick(event: Event): void {
    event.stopPropagation(); // Prevent card click
    const product = this.product();
    if (product && confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.store.dispatch(deleteProduct({ productId: product.id }));
    }
  }
}
