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

  productId: string | null = null

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id')
      if (this.productId) {
        this.categoriesService.loadAllCategories()
        this.productService.getProduct(this.productId)
      }
    })
    console.log('edit log', this.product())
  }

  onFormSubmit(data: CreateProductDto) {
    this.productService.editProducts(this.productId!, {
      title: data.title,
      description: data.description,
      price: data.price,
      images: data.images,
    })
  }

}
