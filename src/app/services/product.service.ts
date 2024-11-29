import {computed, inject, Injectable, signal} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Product, ResponseProducts} from '../interfaces/products.interface';
import {GET_All_PRODUCTS, GET_PRODUCTS} from './graphQl-variables/products-variables.graphql';
import {allowedKeys} from '../mockData/keys';
import {AppLoadingService} from './app-loading.service';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private appLoadingService = inject(AppLoadingService)
  private productsSignal = signal<Product[]>([])
  private productsAdditionalSignal = signal<Product[]>([])
  private tableHeadsSignal = signal<string[]>([])
  private countProductsSignal = computed(() => this.productsAdditionalSignal().length)
  private categoriesSignal = computed(() => this.extractCategories(this.productsAdditionalSignal()))


  constructor(private apollo: Apollo) {}

  get products() {
    return this.productsSignal
  }
  get categories() {
    return this.categoriesSignal
  }
  get tableHeads() {
    return this.tableHeadsSignal
  }
  get countProducts() {
    return this.countProductsSignal
  }

  loadProducts(limit: number, offset: number, categoryId: number) {
    this.appLoadingService.show()
    this.apollo
      .watchQuery<ResponseProducts>({ query: GET_PRODUCTS, variables: { limit, offset, categoryId } })
      .valueChanges.subscribe({
      next: (response) => {
        this.productsSignal.set(response.data.products)
        const filteredKeys = Object.keys(response.data.products[0]).filter(key => allowedKeys.includes(key))
        this.tableHeadsSignal.set(filteredKeys)
        this.appLoadingService.hide()
      },
      error: (err) => {
        console.error('Error fetching products:', err)
        this.appLoadingService.hide()
      },
    })
  }


  loadAllProducts(categoryId: number) {
    this.appLoadingService.show()
    this.apollo
      .watchQuery<ResponseProducts>({ query: GET_All_PRODUCTS, variables: { categoryId } })
      .valueChanges.subscribe({
      next: (response) => {
        this.productsAdditionalSignal.set(response.data.products)

        //products title
        this.appLoadingService.appTitle('Products', response.data.products.length)

        //hide loading
        this.appLoadingService.hide()
      },
      error: (err) => {
        console.error('Error fetching all products:', err);
        this.appLoadingService.hide()
      },
    });
  }

  private extractCategories(products: Product[]): string[] {
    const categoryNames = products.map((product) => product.category.name)
    return Array.from(new Set(categoryNames))
  }

  resetState() {
    this.productsSignal.set([])
    this.appLoadingService.hide()
    this.productsSignal.set([])
  }
}
