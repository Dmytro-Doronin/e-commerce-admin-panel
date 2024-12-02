import {Component, inject, OnInit, Signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {SelectComponent} from '../../components/select/select.component';
import {CategoriesService} from '../../services/category.service';
import {forbiddenNameValidator} from '../../directives/forbidden-name.directive';
import {AppLoadingService} from '../../services/app-loading.service';
import {nonZeroValidator} from '../../validators/products-form.validator';
import {ProductsService} from '../../services/product.service';
import {CreateProductDto} from '../../interfaces/products.interface';
import {IAlert} from '../../interfaces/app.interface';

@Component({
  selector: 'app-add-new-product-page',
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    SelectComponent
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
  categoryId: number | null = null

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.minLength(3), Validators.maxLength(15) ,Validators.required]),
    price: new FormControl<number | null>(null, [Validators.minLength(1), Validators.maxLength(4) ,Validators.required]),
    categoryId: new FormControl<number | null>(null, [nonZeroValidator(), Validators.required]),
    description: new FormControl('', [Validators.minLength(3), Validators.maxLength(100) ,Validators.required]),
    images: new FormControl<string[]>([], [
      Validators.minLength(1),
      Validators.maxLength(1),
      forbiddenNameValidator(/^https?:\/\/[^,\s]+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i),
      Validators.required]
    ),
  })

  ngOnInit() {
    this.appLoadingService.appTitle('Add products', null)
    this.categoriesService.loadAllCategories()
  }

  setCategoryId({ categoryId }: { categoryId: number }) {
    this.addProductForm.get('categoryId')?.setValue(categoryId)
    const categoryIdControl = this.addProductForm.get('categoryId');
    categoryIdControl?.markAsTouched();
    categoryIdControl?.markAsDirty();
    this.categoryId = categoryId
  }

  get categoryIdField() {
    return this.addProductForm.get('categoryId')
  }

  get title() {
    return this.addProductForm.get('title')
  }
  get price() {
    return this.addProductForm.get('price')
  }
  get description() {
    return this.addProductForm.get('description')
  }
  get images() {
    return this.addProductForm.get('images')
  }

  onImagesInput(event: Event): void {
    const input = (event.target as HTMLTextAreaElement).value
    const sanitizedInput = input.replace(/^\[|]$/g, '').replace(/"/g, '');
    const imageArray = sanitizedInput
      .split(',')
      .map((img) => img.trim())
      .filter((img) => img);

    this.addProductForm.get('images')?.setValue(imageArray)
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value

      const payload: CreateProductDto = {
        title: formData.title!,
        price: parseFloat(String(formData.price!)),
        description: formData.description!,
        categoryId: parseFloat(String(formData.categoryId!)),
        images: formData.images ?? []
      }
      this.productService.addNewProducts(payload)
      this.categoryId = null
    }
  }
}
