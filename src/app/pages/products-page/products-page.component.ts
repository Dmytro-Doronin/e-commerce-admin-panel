import {Component, inject, signal} from '@angular/core';
import {ProductsService} from '../../services/product.service';
import {Product} from '../../interfaces/products.interface';

@Component({
  selector: 'app-products-page',
  imports: [],
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  private graphQLService = inject(ProductsService)
  products = signal<Product[]>([])
}

