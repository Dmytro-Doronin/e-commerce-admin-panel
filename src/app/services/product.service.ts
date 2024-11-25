import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apollo: Apollo) {}

  getProducts() {
    const GET_PRODUCTS = gql`
      query {
        products {
          id
          title
          price
          description
          images
          category {
            id
            name
            image
          }
        }
      }
    `

    return this.apollo.watchQuery({
      query: GET_PRODUCTS,
    }).valueChanges
  }
}
