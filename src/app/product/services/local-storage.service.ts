import { Injectable } from '@angular/core';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'products';

  saveProducts(products: Product[]): void {
    try {
      const serialized = JSON.stringify(products);
      localStorage.setItem(this.STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }

  loadProducts(): Product[] | null {
    try {
      const serialized = localStorage.getItem(this.STORAGE_KEY);
      if (!serialized) {
        return null;
      }
      const products = JSON.parse(serialized);
      // Convert date strings back to Date objects
      return products.map((p: Product) => ({
        ...p,
        creationDate: new Date(p.creationDate)
      }));
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
      return null;
    }
  }

  clearProducts(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
