import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProductDetail } from './product-detail';
import { productReducer } from '../../state/product.reducer';
import { Product } from '../../models/products';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;

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
      imports: [ProductDetail],
      providers: [
        provideHttpClient(),
        provideStore({ products: productReducer }),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isDirty to true when field changes', () => {
    component.editedProduct = { ...mockProduct };
    component.onFieldChange();
    expect(component.isDirty).toBe(true);
  });

  it('should validate form correctly', () => {
    component.editedProduct = { ...mockProduct };
    expect(component.isFormValid()).toBe(true);
    
    component.editedProduct = { name: '', description: '', price: 0 };
    expect(component.isFormValid()).toBe(false);
  });

  it('should not save when form is invalid', () => {
    component.editedProduct = { name: '', description: '', price: 0 };
    component.isDirty = true;
    spyOn(component['store'], 'dispatch');
    component.onSave();
    expect(component['store'].dispatch).not.toHaveBeenCalled();
  });
});
