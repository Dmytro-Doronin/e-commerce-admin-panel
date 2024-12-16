import {Component, input, OnInit, output, Signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {nonZeroValidator} from '../../validators/products-form.validator';
import {forbiddenNameValidator} from '../../validators/forbidden-name.directive';
import {forbiddenUrlValidator} from '../../validators/img-category.validator';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {SelectComponent} from '../select/select.component';
import {Category, CreateCategoryDto} from '../../interfaces/category.interface';

@Component({
  selector: 'app-category-form',
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  categoryData = input<Signal<Category | null | undefined>>();
  isEditMode = input<boolean>(false)
  submit = output<CreateCategoryDto>({alias: 'submitForm'})

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.maxLength(20) ,Validators.required]),
    image: new FormControl<string>('', [
      Validators.minLength(1),
      forbiddenUrlValidator(
        /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i
      ),
      Validators.required]
    ),
  })


  ngOnInit() {
    const signal = this.categoryData()
    if (signal) {
      const category = signal()
      if (this.isEditMode() && category) {
        this.categoryForm.patchValue({
          name: category.name,
          image: category.image,
        })
      }
    }
  }

  get name() {
    return this.categoryForm.get('name')
  }

  get image() {
    return this.categoryForm.get('image')
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const payload: CreateCategoryDto = {
        name: this.categoryForm.value.name!,
        image: this.categoryForm.value.image!,
      }

      //send data
      this.submit.emit(payload)

      //clear form
      // this.categoryForm.reset({
      //   name: '',
      //   image: '',
      // });
      Object.keys(this.categoryForm.controls).forEach((key) => {
        const control = this.categoryForm.get(key);
        control?.setErrors(null);
        control?.markAsPristine();
        control?.markAsUntouched();
      })
    }
  }
}
