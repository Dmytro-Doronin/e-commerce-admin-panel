import { Routes } from '@angular/router';
import {ProductsPageComponent} from './pages/products-page/products-page.component';
import {AddNewProductPageComponent} from './pages/add-new-product-page/add-new-product-page.component';
import {EditProductPageComponent} from './pages/edit-product-page/edit-product-page.component';
import {UsersPageComponent} from './pages/users-page/users-page.component';
import {CategoriesPageComponent} from './pages/categories-page/categories-page.component';

export const basePath = '/main'

export const routes: Routes = [
  { path: '', redirectTo: basePath, pathMatch: 'full' },
  {
    path: 'main',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {path: 'products', component: ProductsPageComponent},
      {path: 'add-new-product', component: AddNewProductPageComponent},
      {path: 'edit-product/:id', component: EditProductPageComponent},
      {path: 'users', component: UsersPageComponent},
      {path: 'categories', component: CategoriesPageComponent},

    ]
  }
  // { path: '**', component: ErrorPageComponent },
]
