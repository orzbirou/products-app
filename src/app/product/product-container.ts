import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './ui/product-list/product-list';
import { ProductDetail } from './ui/product-detail/product-detail';

@Component({
  selector: 'app-product-container',
  imports: [ProductList, ProductDetail],
  template: `
    <section class="left-pane">
      <app-product-list></app-product-list>
    </section>
    <section class="right-pane">
      <app-product-detail></app-product-detail>
    </section>
  `,
  styles: [`
    :host {
      display: contents;
    }
    
    .left-pane {
      grid-area: left-pane;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
    }

    .right-pane {
      grid-area: right-pane;
      border-left: 1px solid #ddd;
      background-color: #fff;
      height: 100%;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .left-pane {
        height: auto;
        max-height: 60vh;
        min-height: 300px;
      }

      .right-pane {
        border-left: none;
        border-top: 1px solid #ddd;
        height: auto;
        min-height: 40vh;
      }
    }
  `]
})
export class ProductContainer {}
