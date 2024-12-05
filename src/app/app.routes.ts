import { Routes } from '@angular/router';
import {ProductsPageComponent} from './pages/products-page/products-page.component';
import {AddNewProductPageComponent} from './pages/add-new-product-page/add-new-product-page.component';

export const basePath = '/main'

export const routes: Routes = [
  { path: '', redirectTo: basePath, pathMatch: 'full' },
  {
    path: 'main',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {path: 'products', component: ProductsPageComponent},
      {path: 'add-new-product', component: AddNewProductPageComponent},
      {path: 'edit-product/:id', component: AddNewProductPageComponent},
    ]
  }
  // { path: '**', component: ErrorPageComponent },
]
