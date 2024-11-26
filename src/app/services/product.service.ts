import {Injectable, signal} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Product, ResponseProducts} from '../interfaces/products.interface';
import {GET_PRODUCTS} from './graphQl-variables/products-variables.graphql';
import {allowedKeys} from '../mockData/keys';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private productsSignal = signal<Product[]>([])
  private tableHeadsSignal = signal<string[]>([])
  private loadingSignal = signal<boolean>(false)

  constructor(private apollo: Apollo) {}

  get products() {
    return this.productsSignal
  }
  get tableHeads() {
    return this.tableHeadsSignal
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

  resetState() {
    this.productsSignal.set([])
    this.loadingSignal.set(false)
    this.productsSignal.set([])
  }
}
