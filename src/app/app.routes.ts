import { Routes } from '@angular/router';
import {ProductsPageComponent} from './pages/products-page/products-page.component';
import {AddNewProductPageComponent} from './pages/add-new-product-page/add-new-product-page.component';
import {EditProductPageComponent} from './pages/edit-product-page/edit-product-page.component';
import {UsersPageComponent} from './pages/users-page/users-page.component';
import {CategoriesPageComponent} from './pages/categories-page/categories-page.component';
import {AddNewCategoryPageComponent} from './pages/add-new-category-page/add-new-category-page.component';
import {EditCategoryPageComponent} from './pages/edit-category-page/edit-category-page.component';
import {AuthPageComponent} from './pages/auth-page/auth-page.component';

export const basePath = '/main'

export const routes: Routes = [
  { path: '', redirectTo: basePath, pathMatch: 'full' },
  { path: 'auth', component: AuthPageComponent},
  {
    path: 'main',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {path: 'products', component: ProductsPageComponent},
      {path: 'add-new-product', component: AddNewProductPageComponent},
      {path: 'edit-product/:id', component: EditProductPageComponent},
      {path: 'users', component: UsersPageComponent},
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'add-new-category', component: AddNewCategoryPageComponent},
      {path: 'edit-category/:id', component: EditCategoryPageComponent},
    ]
  }
  // { path: '**', component: ErrorPageComponent },
]
