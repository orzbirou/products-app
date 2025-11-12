import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/products';
import { selectSelectedProduct } from '../../state/product.selectors';
import { updateProduct, createProduct, selectProduct } from '../../state/product.actions';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  editedProduct: Partial<Product> | null = null;
  isDirty = false;
  isNewProduct = false;
  formErrors: { [key: string]: string } = {};

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Listen to route params
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params['id'];
      if (id) {
        const productId = id === 'new' ? 0 : +id;
        this.store.dispatch(selectProduct({ productId }));
      }
    });

    // Subscribe to selected product
    this.store.select(selectSelectedProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe(product => {
        if (product) {
          this.editedProduct = { ...product };
          this.isDirty = false;
          this.isNewProduct = product.id === 0;
          this.formErrors = {};
        } else {
          this.editedProduct = null;
          this.isDirty = false;
          this.isNewProduct = false;
          this.formErrors = {};
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFieldChange(): void {
    this.isDirty = true;
    this.validateForm();
  }

  validateForm(): void {
    const errors: { [key: string]: string } = {};
    
    if (!this.editedProduct) {
      this.formErrors = errors;
      return;
    }

    // Validate name
    if (!this.editedProduct.name || this.editedProduct.name.trim() === '') {
      errors['name'] = 'Product name is required';
    }

    // Validate description
    if (!this.editedProduct.description || this.editedProduct.description.trim() === '') {
      errors['description'] = 'Description is required';
    }

    // Validate price
    if (this.editedProduct.price === undefined || this.editedProduct.price === null || this.editedProduct.price === 0) {
      errors['price'] = 'Price is required';
    }

    this.formErrors = errors;
  }

  isFormValid(): boolean {
    if (!this.editedProduct) return false;
    
    // Check if all required fields are filled
    const hasName = !!(this.editedProduct.name && this.editedProduct.name.trim() !== '');
    const hasDescription = !!(this.editedProduct.description && this.editedProduct.description.trim() !== '');
    const hasPrice = this.editedProduct.price !== undefined && 
                     this.editedProduct.price !== null && 
                     this.editedProduct.price !== 0;
    
    return hasName && hasDescription && hasPrice;
  }

  onSave(): void {
    if (!this.editedProduct || !this.isDirty || !this.isFormValid()) return;
    
    this.validateForm(); // Update error messages if any

    if (this.isNewProduct) {
      const newProduct: Product = {
        id: Date.now(),
        name: this.editedProduct.name || '',
        description: this.editedProduct.description || '',
        price: this.editedProduct.price || 0,
        imageUrl: this.editedProduct.imageUrl || '',
        creationDate: new Date()
      };
      this.store.dispatch(createProduct({ product: newProduct }));
    } else {
      this.store.dispatch(updateProduct({ product: this.editedProduct as Product }));
    }
    
    this.isDirty = false;
  }
}
