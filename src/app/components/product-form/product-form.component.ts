import {Component, input, output, Signal} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectComponent} from '../select/select.component';
import {nonZeroValidator} from '../../validators/products-form.validator';
import {forbiddenNameValidator} from '../../validators/forbidden-name.directive';
import {CreateProductDto} from '../../interfaces/products.interface';

@Component({
  selector: 'app-product-form',
  imports: [
    CdkTextareaAutosize,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    SelectComponent
  ],
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  categories = input<Signal<string[]>>()
  submit = output<CreateProductDto>({alias: 'submitForm'})

  categoryId: number | null = null

  productForm = new FormGroup({
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

  setCategoryId({ categoryId }: { categoryId: number }) {
    this.productForm.get('categoryId')?.setValue(categoryId)
    const categoryIdControl = this.productForm.get('categoryId');
    categoryIdControl?.markAsTouched();
    categoryIdControl?.markAsDirty();
    this.categoryId = categoryId
  }

  get categoryIdField() {
    return this.productForm.get('categoryId')
  }

  get title() {
    return this.productForm.get('title')
  }
  get price() {
    return this.productForm.get('price')
  }
  get description() {
    return this.productForm.get('description')
  }
  get images() {
    return this.productForm.get('images')
  }

  onImagesInput(event: Event): void {
    const input = (event.target as HTMLTextAreaElement).value
    const sanitizedInput = input.replace(/^\[|]$/g, '').replace(/"/g, '');
    const imageArray = sanitizedInput
      .split(',')
      .map((img) => img.trim())
      .filter((img) => img);

    this.productForm.get('images')?.setValue(imageArray)
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value

      const payload: CreateProductDto = {
        title: formData.title!,
        price: parseFloat(String(formData.price!)),
        description: formData.description!,
        categoryId: parseFloat(String(formData.categoryId!)),
        images: formData.images ?? []
      }
      this.submit.emit(payload)
      this.productForm.reset({
        title: '',
        price: null,
        description: '',
        categoryId: null,
        images: []
      });
      Object.keys(this.productForm.controls).forEach((key) => {
        const control = this.productForm.get(key);
        control?.setErrors(null);
        control?.markAsPristine();
        control?.markAsUntouched();
      })

      this.categoryId = null;
    }
  }
}
