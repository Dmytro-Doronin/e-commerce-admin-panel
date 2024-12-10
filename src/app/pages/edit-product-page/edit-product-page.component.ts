import {Component, effect, inject, OnInit, Signal, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CreateProductDto, Product, Product2} from '../../interfaces/products.interface';
import {ProductsService} from '../../services/product.service';
import {ProductFormComponent} from '../../components/product-form/product-form.component';
import {CategoriesService} from '../../services/category.service';

@Component({
  selector: 'app-edit-product-page',
  imports: [
    ProductFormComponent
  ],
  standalone: true,
  templateUrl: './edit-product-page.component.html',
  styleUrl: './edit-product-page.component.scss'
})
export class EditProductPageComponent implements OnInit {
  route = inject(ActivatedRoute)
  private productService = inject(ProductsService)
  private categoriesService = inject(CategoriesService)
  product: Signal<Product2 | null> = this.productService.product
  categories: Signal<string[]> = this.categoriesService.categoriesNames


  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')
      if (id) {
        this.categoriesService.loadAllCategories()
        this.productService.getProduct(id)
      }
    })
    console.log('edit log', this.product())
  }

  onFormSubmit(data: CreateProductDto) {
    console.log(data)
  }

}
