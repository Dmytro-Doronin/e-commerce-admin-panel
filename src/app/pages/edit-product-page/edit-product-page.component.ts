import {Component, effect, inject, OnInit, Signal, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../interfaces/products.interface';
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
  product: Signal<Product | null> = this.productService.product
  private categoriesService = inject(CategoriesService)
  categories: Signal<string[]> = this.categoriesService.categoriesNames

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.categoriesService.loadAllCategories()
      console.log('id', id)
      if (id) {
        this.productService.getProduct(id);
      }
  }
}
