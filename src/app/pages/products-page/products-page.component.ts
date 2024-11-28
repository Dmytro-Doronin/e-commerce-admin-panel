import {Component, effect, inject, OnDestroy, OnInit, Signal, signal} from '@angular/core';
import {ProductsService} from '../../services/product.service';
import {Product} from '../../interfaces/products.interface';
import {ImagesArrayComponentComponent} from '../../components/images-array-component/images-array-component.component';
import {TableRowComponent} from '../../components/table/table-row/table-row.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

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
    MatPaginatorModule
  ],
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private productService = inject(ProductsService)
  products: Signal<Product[]> = this.productService.products
  productsTittles: Signal<string[]> = this.productService.tableHeads
  productsCount: Signal<number> = this.productService.countProducts

  private limit = 15
  private offset = 0

  constructor() {
    effect(() => {
      console.log('Updated titles:', this.productsTittles());
      console.log('Updated зкщвгсеы:', this.products());
    });
  }

  ngOnInit() {
    this.productService.loadProducts(this.limit, this.offset)
    this.productService.loadAllProducts()
  }

  onPageChange(event: PageEvent) {
    this.offset = event.pageIndex * 15
    this.limit = event.pageSize

    this.productService.loadProducts(this.limit, this.offset)
  }

  handleAction(id: string) {
    console.log(id)
  }

  ngOnDestroy() {
    this.productService.resetState()
  }
}

