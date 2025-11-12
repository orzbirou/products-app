import { Routes } from '@angular/router';
import { ProductContainer } from './product/product-container';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { 
    path: 'products', 
    component: ProductContainer,
    children: [
      { path: ':id', component: ProductContainer }
    ]
  }
];
