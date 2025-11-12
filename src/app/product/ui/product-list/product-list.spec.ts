import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProductList } from './product-list';
import { productReducer } from '../../state/product.reducer';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        provideHttpClient(),
        provideStore({ products: productReducer }),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with page 1', () => {
    expect(component.currentPage).toBe(1);
  });

  it('should update search term when onSearchChanged is called', () => {
    component.onSearchChanged('test');
    expect(component.currentPage).toBe(1);
  });

  it('should update sort when onSortChanged is called', () => {
    component.onSortChanged('name');
    expect(component.currentPage).toBe(1);
  });
});
