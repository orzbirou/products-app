import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list-toolbar',
  imports: [FormsModule],
  templateUrl: './product-list-toolbar.html',
  styleUrl: './product-list-toolbar.scss',
})
export class ProductListToolbar {
  @Output() addProductClicked = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() sortChanged = new EventEmitter<string>();

  searchTerm = '';
  sortBy = '';

  onAddProduct(): void {
    this.addProductClicked.emit();
  }

  onSearchChange(value: string): void {
    this.searchChanged.emit(value);
  }

  onSortChange(value: string): void {
    this.sortChanged.emit(value);
  }
}
