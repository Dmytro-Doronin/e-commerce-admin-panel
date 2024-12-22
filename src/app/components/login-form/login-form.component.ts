import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    MatCard,
    MatCardContent,
    MatButton,
  ],
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {


  loginForm = new FormGroup({
    email: new FormControl('nico123@gmail.com', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl('12345678', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
  })

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  onSubmit() {
    console.log('form works')
  }

}
