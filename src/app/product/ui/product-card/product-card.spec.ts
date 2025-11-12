import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProductCard } from './product-card';
import { productReducer } from '../../state/product.reducer';
import { Product } from '../../models/products';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    imageUrl: 'https://test.com/image.jpg',
    creationDate: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [
        provideHttpClient(),
        provideStore({ products: productReducer }),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.product-name')?.textContent).toContain('Test Product');
  });

  it('should dispatch selectProduct action on card click', () => {
    spyOn(component['store'], 'dispatch');
    component.onCardClick();
    expect(component['store'].dispatch).toHaveBeenCalled();
  });

  it('should stop propagation and show confirm on delete click', () => {
    const event = new Event('click');
    spyOn(event, 'stopPropagation');
    spyOn(window, 'confirm').and.returnValue(false);
    component.onDeleteClick(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
