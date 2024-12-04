import {Component, inject, OnInit, Signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {SelectComponent} from '../../components/select/select.component';
import {CategoriesService} from '../../services/category.service';
import {forbiddenNameValidator} from '../../validators/forbidden-name.directive';
import {AppLoadingService} from '../../services/app-loading.service';
import {nonZeroValidator} from '../../validators/products-form.validator';
import {ProductsService} from '../../services/product.service';
import {CreateProductDto} from '../../interfaces/products.interface';
import {IAlert} from '../../interfaces/app.interface';
import {ProductFormComponent} from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-add-new-product-page',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ProductFormComponent
  ],
  standalone: true,
  templateUrl: './add-new-product-page.component.html',
  styleUrl: './add-new-product-page.component.scss'
})
export class AddNewProductPageComponent implements OnInit {
  private categoriesService = inject(CategoriesService)
  private appLoadingService = inject(AppLoadingService)
  private productService = inject(ProductsService)
  categories: Signal<string[]> = this.categoriesService.categoriesNames
  alert: Signal<IAlert | null> = this.appLoadingService.alert


  ngOnInit() {
    this.appLoadingService.appTitle('Add products', null)
    this.categoriesService.loadAllCategories()
  }

  onFormSubmit(data: CreateProductDto) {
    this.productService.addNewProducts(data)
  }
}
