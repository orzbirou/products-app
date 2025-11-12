import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  loadProducts(): Observable<Product[]> {
    return this.http.get<any[]>('products.json').pipe(
      map(products => products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        creationDate: new Date(product.creationDate),
        imageUrl: product.imageUrl
      } as Product)))
    );
  }
}