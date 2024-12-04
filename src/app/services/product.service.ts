import {computed, inject, Injectable, signal} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  CreateProductDto,
  Product,
  ResponseDeleteProduct,
  ResponseProducts,
  ResponseProductsForAdd
} from '../interfaces/products.interface';
import {
  ADD_NEW_PRODUCT,
  DELETE_PRODUCT,
  GET_All_PRODUCTS,
  GET_PRODUCTS
} from './graphQl-variables/products-variables.graphql';
import {allowedKeys} from '../mockData/keys';
import {AppLoadingService} from './app-loading.service';
import {OperationVariables, TypedDocumentNode} from '@apollo/client';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private appLoadingService = inject(AppLoadingService)
  private apollo = inject(Apollo)
  private productsSignal = signal<Product[]>([])
  private productsAdditionalSignal = signal<Product[]>([])
  private tableHeadsSignal = signal<string[]>([])
  private countProductsSignal = computed(() => this.productsAdditionalSignal().length)
  private categoriesSignal = signal<string[]>([])


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

  private fetchData<T, V extends OperationVariables>(query: TypedDocumentNode<T, V>, variables: V, onSuccess: (data: T) => void) {
    this.appLoadingService.show()
    this.apollo
      .watchQuery<T, V>({ query, variables })
      .valueChanges.subscribe({
      next: (result) => {
        onSuccess(result.data)
        this.appLoadingService.hide()
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.appLoadingService.hide()
      },
    })
  }

  private fetchMutation<T, V extends OperationVariables>(
    mutation: TypedDocumentNode<T, V>,
    variables: V,
    onSuccess: (data: T) => void
  ) {
    this.appLoadingService.show()
    this.apollo
      .mutate<T, V>({ mutation, variables })
      .subscribe({
        next: (result) => {
          if (result.data) {
            onSuccess(result.data)
          }
          this.appLoadingService.hide()
        },
        error: (err) => {
          this.appLoadingService.setAlert({message: err.message, severity: 'error'})
          this.appLoadingService.hide()
        },
      });
  }

  loadProducts(limit: number, offset: number, categoryId: number) {
    this.fetchData<ResponseProducts, { limit: number; offset: number; categoryId: number }>(
      GET_PRODUCTS,
      { limit, offset, categoryId },
      (data) => {
        this.productsSignal.set(data.products)
        const filteredKeys = Object.keys(data.products[0]).filter((key) => allowedKeys.includes(key))
        this.tableHeadsSignal.set(filteredKeys)
      }
    )
  }

  loadAllProducts(categoryId: number) {
    this.fetchData<ResponseProducts, { categoryId: number }>(
      GET_All_PRODUCTS,
      { categoryId },
      (data) => {
        this.productsAdditionalSignal.set(data.products);
        this.appLoadingService.appTitle('Products', data.products.length);
      }
    )
  }

  addNewProducts(data: CreateProductDto) {
    this.fetchMutation<ResponseProductsForAdd, { data: CreateProductDto }>(
      ADD_NEW_PRODUCT,
      { data },
      (data) => {
        this.appLoadingService.setAlert({message: 'Product has been added', severity: 'success'})
      }
    )
  }

  deleteProduct(id: number) {
    this.fetchMutation<ResponseDeleteProduct, { id: number }>(
      DELETE_PRODUCT,
      { id },
      (response) => {
        if (response.deleteProduct) {
          //remove from current product list
          const filteredProducts = this.productsSignal().filter(product => product.id !== String(id))
          this.productsSignal.set(filteredProducts)

          //remove from product list
          const filteredAdditionalProducts = this.productsAdditionalSignal().filter(product => product.id !== String(id))
          this.productsAdditionalSignal.set(filteredAdditionalProducts)
          this.appLoadingService.setAlert({
            message: 'Product has been deleted',
            severity: 'success',
          });
        } else {
          this.appLoadingService.setAlert({
            message: 'Failed to delete the product.',
            severity: 'error',
          })
        }
      }
    )
  }

  // loadProducts(limit: number, offset: number, categoryId: number) {
  //   this.appLoadingService.show()
  //   this.apollo
  //     .watchQuery<ResponseProducts>({ query: GET_PRODUCTS, variables: { limit, offset, categoryId } })
  //     .valueChanges.subscribe({
  //     next: (response) => {
  //       this.productsSignal.set(response.data.products)
  //       const filteredKeys = Object.keys(response.data.products[0]).filter(key => allowedKeys.includes(key))
  //       this.tableHeadsSignal.set(filteredKeys)
  //       this.appLoadingService.hide()
  //     },
  //     error: (err) => {
  //       console.error('Error fetching products:', err)
  //       this.appLoadingService.hide()
  //     },
  //   })
  // }
  //
  //
  // loadAllProducts(categoryId: number) {
  //   this.appLoadingService.show()
  //   this.apollo
  //     .watchQuery<ResponseProducts>({ query: GET_All_PRODUCTS, variables: { categoryId } })
  //     .valueChanges.subscribe({
  //     next: (response) => {
  //       this.productsAdditionalSignal.set(response.data.products)
  //
  //       //products title
  //       this.appLoadingService.appTitle('Products', response.data.products.length)
  //
  //       if (categoryId === 0) {
  //         this.categoriesSignal.set(this.extractCategories(response.data.products))
  //       }
  //
  //       //hide loading
  //       this.appLoadingService.hide()
  //     },
  //     error: (err) => {
  //       console.error('Error fetching all products:', err);
  //       this.appLoadingService.hide()
  //     },
  //   });
  // }
  //
  //
  resetState() {
    this.productsSignal.set([])
    this.appLoadingService.hide()
    this.productsSignal.set([])
  }
}
