import {Component, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../../services/category.service';
import {Category, CreateCategoryDto} from '../../interfaces/category.interface';
import {CategoryFormComponent} from '../../components/category-form/category-form.component';

@Component({
  selector: 'app-edit-category-page',
  imports: [
    CategoryFormComponent
  ],
  standalone: true,
  templateUrl: './edit-category-page.component.html',
  styleUrl: './edit-category-page.component.scss'
})
export class EditCategoryPageComponent implements OnInit{
  route = inject(ActivatedRoute)
  categoriesService = inject(CategoriesService)

  category: Signal<Category | null> = this.categoriesService.category

  categoryId: string | null = null

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id')
      if (this.categoryId) {
        this.categoriesService.loadCategory(+this.categoryId)
      }
    })
  }

  onFormSubmit(data: CreateCategoryDto) {
    if (this.categoryId) {
      this.categoriesService.editCategory(+this.categoryId, data)
    }
  }
}
