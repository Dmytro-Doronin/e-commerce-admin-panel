import {Injectable, signal} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Product, ResponseProducts} from '../interfaces/products.interface';
import {GET_PRODUCTS} from './graphQl-variables/products-variables.graphql';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private productsSignal = signal<Product[]>([])
  private loadingSignal = signal<boolean>(false)

  constructor(private apollo: Apollo) {}

  get products() {
    return this.productsSignal
  }

  get isLoading() {
    return this.loadingSignal
  }

  loadProducts() {

    this.loadingSignal.set(true);
    this.apollo
      .watchQuery<ResponseProducts>({ query: GET_PRODUCTS })
      .valueChanges.subscribe({
      next: (response) => {
        this.productsSignal.set(response.data.products)
        this.loadingSignal.set(false)
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loadingSignal.set(false)
      },
    });
  }

  resetState() {
    this.productsSignal.set([]);
    this.loadingSignal.set(false);
  }
}
