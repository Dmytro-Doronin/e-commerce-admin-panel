import {inject, Injectable, signal} from '@angular/core';
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
  private tableHeadsSignal = signal<string[]>([])
  private countProductsSignal = signal<number>(0)


  constructor(private apollo: Apollo) {}

  get products() {
    return this.productsSignal
  }
  get tableHeads() {
    return this.tableHeadsSignal
  }
  get countProducts() {
    return this.countProductsSignal
  }


  loadProducts(limit: number, offset: number) {

    // this.loadingSignal.set(true)
    this.appLoadingService.show()
    this.apollo
      .watchQuery<ResponseProducts>({ query: GET_PRODUCTS, variables: { limit, offset } })
      .valueChanges.subscribe({
      next: (response) => {
        this.productsSignal.set(response.data.products)
        const filteredKeys = Object.keys(response.data.products[0]).filter(key => allowedKeys.includes(key))
        this.tableHeadsSignal.set(filteredKeys)
        this.appLoadingService.hide()
        // this.loadingSignal.set(false)
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        // this.loadingSignal.set(false)
        this.appLoadingService.hide()
      },
    });
  }
  loadAllProducts() {
    this.appLoadingService.show()
    this.apollo
      .watchQuery<ResponseProducts>({ query: GET_All_PRODUCTS })
      .valueChanges.subscribe({
      next: (response) => {
        this.countProductsSignal.set(response.data.products.length)
        this.appLoadingService.hide()
      },
      error: (err) => {
        console.error('Error fetching all products:', err);
        this.appLoadingService.hide()
      },
    });
  }

  resetState() {
    this.productsSignal.set([])
    this.appLoadingService.hide()
    this.productsSignal.set([])
  }
}
