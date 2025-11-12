import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListToolbar } from './product-list-toolbar';

describe('ProductListToolbar', () => {
  let component: ProductListToolbar;
  let fixture: ComponentFixture<ProductListToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListToolbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addProductClicked when add button is clicked', () => {
    spyOn(component.addProductClicked, 'emit');
    component.onAddProduct();
    expect(component.addProductClicked.emit).toHaveBeenCalled();
  });

  it('should emit searchChanged when search input changes', () => {
    spyOn(component.searchChanged, 'emit');
    const input = fixture.nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchChanged.emit).toHaveBeenCalledWith('test');
  });

  it('should emit sortChanged when sort dropdown changes', () => {
    spyOn(component.sortChanged, 'emit');
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'name';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.sortChanged.emit).toHaveBeenCalledWith('name');
  });
});
