import {Component, inject} from '@angular/core';
import {CategoryFormComponent} from '../../components/category-form/category-form.component';
import {CreateCategoryDto} from '../../interfaces/category.interface';
import {CategoriesService} from '../../services/category.service';

@Component({
  selector: 'app-add-new-category-page',
  imports: [
    CategoryFormComponent
  ],
  standalone: true,
  templateUrl: './add-new-category-page.component.html',
  styleUrl: './add-new-category-page.component.scss'
})
export class AddNewCategoryPageComponent {

  private categoriesService = inject(CategoriesService)

  onFormSubmit(data: CreateCategoryDto) {
    this.categoriesService.addNewCategory(data)
  }

}
