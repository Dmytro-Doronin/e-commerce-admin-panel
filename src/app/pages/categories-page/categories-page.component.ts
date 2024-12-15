import {Component, computed, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {CategoriesService} from '../../services/category.service';
import {Category} from '../../interfaces/category.interface';
import {basePath} from '../../app.routes';
import {ImagesArrayComponentComponent} from '../../components/images-array-component/images-array-component.component';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {AppLoadingService} from '../../services/app-loading.service';
import {
  DeleteConfirmationDialogComponent1
} from '../../components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-categories-page',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    RouterLink
  ],
  standalone: true,
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss'
})

export class CategoriesPageComponent implements OnInit {
  appLoadingService = inject(AppLoadingService)
  categoriesService = inject(CategoriesService)
  private dialog = inject(MatDialog)
  categories: Signal<Category[]> = this.categoriesService.categories
  categoriesTitles: Signal<string[]> = this.categoriesService.categoriesTableHead
  loading: Signal<boolean> = this.appLoadingService.appLoading

  showLoadMore = computed(() => this.limit() <= this.categories()!.length)
  protected readonly basePath = basePath
  limit= signal<number>(10)

  ngOnInit(){
    this.categoriesService.loadAllCategories(true, this.limit())
  }


  openDeleteDialog(categoryId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent1, {
      data: {
        title: 'Confirmation delete',
        content: `Are you sure you want to remove the category? ${categoryId}?`,
        cancelText: 'Cancel',
        confirmText: 'Delete',
      },
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // this.productService.deleteProduct(+productId)
        this.categoriesService.deleteCategory(+categoryId)
        console.log('Deleting the dialog with id ' + categoryId)
      }
    })
  }


  loadMore() {
    this.limit.set(this.limit() + 10)
    this.categoriesService.loadAllCategories(false, this.limit())
  }
}
