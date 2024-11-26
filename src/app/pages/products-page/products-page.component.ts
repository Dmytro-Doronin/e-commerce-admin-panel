import {Component, effect, inject, OnDestroy, OnInit, Signal, signal} from '@angular/core';
import {ProductsService} from '../../services/product.service';
import {Product} from '../../interfaces/products.interface';
import {ImagesArrayComponentComponent} from '../../components/images-array-component/images-array-component.component';

@Component({
  selector: 'app-products-page',
  imports: [
    ImagesArrayComponentComponent
  ],
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  private productService = inject(ProductsService)
  products: Signal<Product[]> = this.productService.products
  productsTittles: Signal<string[]> = this.productService.tableHeads

  private limit = 10
  private offset = 0

  constructor() {
    effect(() => {
      console.log('Updated titles:', this.productsTittles());
    });
  }

  ngOnInit() {
    this.productService.loadProducts(this.limit, this.offset)
    console.log(this.productsTittles())
  }



  ngOnDestroy() {
    this.productService.resetState()
  }
}

