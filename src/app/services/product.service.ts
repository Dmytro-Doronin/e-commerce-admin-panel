import {Injectable, signal} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Product, ResponseProducts} from '../interfaces/products.interface';
import {GET_All_PRODUCTS, GET_PRODUCTS} from './graphQl-variables/products-variables.graphql';
import {allowedKeys} from '../mockData/keys';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private productsSignal = signal<Product[]>([])
  private tableHeadsSignal = signal<string[]>([])
  private loadingSignal = signal<boolean>(false)
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

  get isLoading() {
    return this.loadingSignal
  }

  loadProducts(limit: number, offset: number) {

    this.loadingSignal.set(true);
    this.apollo
      .watchQuery<ResponseProducts>({ query: GET_PRODUCTS, variables: { limit, offset } })
      .valueChanges.subscribe({
      next: (response) => {
        this.productsSignal.set(response.data.products)
        const filteredKeys = Object.keys(response.data.products[0]).filter(key => allowedKeys.includes(key))
        this.tableHeadsSignal.set(filteredKeys)
        this.loadingSignal.set(false)
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loadingSignal.set(false)
      },
    });
  }
  loadAllProducts() {
    this.loadingSignal.set(true);
    this.apollo
      .watchQuery<ResponseProducts>({ query: GET_All_PRODUCTS })
      .valueChanges.subscribe({
      next: (response) => {
        this.countProductsSignal.set(response.data.products.length)
        this.loadingSignal.set(false)
      },
      error: (err) => {
        console.error('Error fetching all products:', err);
        this.loadingSignal.set(false)
      },
    });
  }

  resetState() {
    this.productsSignal.set([])
    this.loadingSignal.set(false)
    this.productsSignal.set([])
  }
}
