import {Component, inject, OnDestroy, OnInit, Signal, signal} from '@angular/core';
import {ProductsService} from '../../services/product.service';
import {Product} from '../../interfaces/products.interface';

@Component({
  selector: 'app-products-page',
  imports: [],
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private productService = inject(ProductsService)
  products: Signal<Product[]> = this.productService.products


  ngOnInit() {
    this.productService.loadProducts()
  }

  ngOnDestroy() {
    this.productService.resetState()
  }
}

