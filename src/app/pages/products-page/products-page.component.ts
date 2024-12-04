import {Component, effect, inject, OnChanges, OnDestroy, OnInit, Signal, signal, SimpleChanges} from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';
import {
  DeleteConfirmationDialogComponent1
} from '../../components/delete-confirmation-dialog/delete-confirmation-dialog.component';

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
    RouterLink,
  ],

  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  protected readonly basePath = basePath;
  private productService = inject(ProductsService)
  private categoriesService = inject(CategoriesService)
  private dialog = inject(MatDialog);
  products: Signal<Product[] | null> = this.productService.products
  productsTittles: Signal<string[]> = this.productService.tableHeads
  productsCount: Signal<number> = this.productService.countProducts
  categories: Signal<string[]> = this.categoriesService.categoriesNames
  // categories: Signal<string[]> = this.productService.categories

  limit = 10
  private offset = 0
  private categoryId: number = 0

  constructor() {
    effect(() => {
      const currentProducts = this.products()
      console.log('Updated products:', currentProducts)
    })
  }

  ngOnInit() {
    this.productService.loadProducts(this.limit, this.offset, this.categoryId)
    this.productService.loadAllProducts(this.categoryId)
    this.categoriesService.loadAllCategories()
  }

  openDeleteDialog(productId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent1, {
      data: {
        title: 'Confirmation delete',
        content: `Are you sure you want to remove the product? ${productId}?`,
        cancelText: 'Cancel',
        confirmText: 'Delete',
      },
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.deleteProduct(+productId)
        console.log('Deleting the product with id ' + productId);
      }
    })
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

}

