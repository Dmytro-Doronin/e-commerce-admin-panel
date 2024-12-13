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
  categories: Signal<Category[]> = this.categoriesService.categories
  categoriesTitles: Signal<string[]> = this.categoriesService.categoriesTableHead
  loading: Signal<boolean> = this.appLoadingService.appLoading

  protected readonly basePath = basePath
  limit: number = 10

  ngOnInit(){
    this.categoriesService.loadAllCategories(true, this.limit)
  }

  loadMore() {
    this.limit = this.limit + 10
    this.categoriesService.loadAllCategories(false, this.limit)
  }

}
