import { Routes } from '@angular/router';
import {ProductsPageComponent} from './pages/products-page/products-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    children: [
      {path: 'products', component: ProductsPageComponent}
    ]
  }
  // { path: '**', component: ErrorPageComponent },
]
