import {TypedDocumentNode} from '@apollo/client';
import {ResponseProducts} from '../../interfaces/products.interface';
import {gql} from 'apollo-angular';

export const GET_PRODUCTS: TypedDocumentNode<ResponseProducts, {}> = gql`
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
