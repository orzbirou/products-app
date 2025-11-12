import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductContainer } from "./product/product-container";
import { loadProducts } from './product/state/product.actions';

@Component({
  selector: 'app-root',
  imports: [ProductContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('product-app');

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }
}
