import {Component, effect, inject, OnDestroy, OnInit, Signal, signal} from '@angular/core';
import {ProductsService} from '../../services/product.service';
import {Product} from '../../interfaces/products.interface';
import {ImagesArrayComponentComponent} from '../../components/images-array-component/images-array-component.component';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatRow,
  MatTable, MatTableModule
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {AppLoadingService} from '../../services/app-loading.service';
import {SelectComponent} from '../../components/select/select.component';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-products-page',
  imports: [
    MatTableModule,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    ImagesArrayComponentComponent,
    MatButton,
    MatPaginatorModule,
    SelectComponent
  ],
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private productService = inject(ProductsService)
  private appLoadingService = inject(AppLoadingService)
  products: Signal<Product[]> = this.productService.products
  productsTittles: Signal<string[]> = this.productService.tableHeads
  productsCount: Signal<number> = this.productService.countProducts
  categories: Signal<string[]> = this.productService.categories

  limit = 10
  private offset = 0
  private categoryId: number = 0

  constructor() {
    effect(() => {
      console.log('Updated titles:', this.productsTittles());
      console.log('Updated зкщвгсеы:', this.products());
    });
  }

  ngOnInit() {
    this.productService.loadProducts(this.limit, this.offset, this.categoryId)
    this.productService.loadAllProducts(this.categoryId)
  }

  onPageChange(event: PageEvent) {
    this.offset = event.pageIndex * this.limit
    this.limit = event.pageSize

    this.productService.loadProducts(this.limit, this.offset, this.categoryId)
  }

  setCategoryId({ categoryId }: { categoryId: number }) {
    this.categoryId = categoryId

    this.productService.loadAllProducts(this.categoryId)
  }

  handleAction(id: string) {
    console.log(id)
  }

  ngOnDestroy() {
    this.productService.resetState()
  }
}

