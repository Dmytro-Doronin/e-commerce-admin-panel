import {Component, inject, OnInit, Signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {Product} from '../../interfaces/products.interface';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {SelectComponent} from '../../components/select/select.component';
import {CategoriesService} from '../../services/category.service';

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
  categories: Signal<string[]> = this.categoriesService.categoriesNames
  categoryId: number = 0

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.minLength(3), Validators.maxLength(15) ,Validators.required]),
    price: new FormControl('', [Validators.minLength(1), Validators.maxLength(4) ,Validators.required]),
    description: new FormControl('', [Validators.minLength(3), Validators.maxLength(100) ,Validators.required]),
  })

  ngOnInit() {
    this.categoriesService.loadAllCategories()
  }

  setCategoryId({ categoryId }: { categoryId: number }) {
    this.categoryId = categoryId
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

  onSubmit() {
    console.log(this.addProductForm.value)
  }


}
