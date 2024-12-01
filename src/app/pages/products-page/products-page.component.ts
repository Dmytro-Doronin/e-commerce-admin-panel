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
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {SelectComponent} from '../../components/select/select.component';
import {CategoriesService} from '../../services/category.service';
import {RouterLink} from '@angular/router';
import {basePath} from '../../app.routes';

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
    SelectComponent,
    MatButtonModule,
    RouterLink
  ],
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private productService = inject(ProductsService)
  private categoriesService = inject(CategoriesService)
  products: Signal<Product[] | null> = this.productService.products
  productsTittles: Signal<string[]> = this.productService.tableHeads
  productsCount: Signal<number> = this.productService.countProducts
  categories: Signal<string[]> = this.categoriesService.categoriesNames
  // categories: Signal<string[]> = this.productService.categories

  limit = 10
  private offset = 0
  private categoryId: number = 0

  ngOnInit() {
    this.productService.loadProducts(this.limit, this.offset, this.categoryId)
    this.productService.loadAllProducts(this.categoryId)
    this.categoriesService.loadAllCategories()
  }

  onPageChange(event: PageEvent) {
    this.offset = event.pageIndex * this.limit
    this.limit = event.pageSize

    this.productService.loadProducts(this.limit, this.offset, this.categoryId)
  }

  setCategoryId({ categoryId }: { categoryId: number }) {
    this.categoryId = categoryId
    this.productService.loadProducts(this.limit, this.offset, this.categoryId)
    this.productService.loadAllProducts(this.categoryId)
  }

  handleAction(id: string) {
    console.log(id)
  }

  ngOnDestroy() {
    this.productService.resetState()
  }

  protected readonly basePath = basePath;
}

