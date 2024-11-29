import {TypedDocumentNode} from '@apollo/client';
import {ResponseProducts} from '../../interfaces/products.interface';
import {gql} from 'apollo-angular';

export const GET_PRODUCTS: TypedDocumentNode<ResponseProducts, { limit: number, offset: number, $categoryId: number }> = gql`
  query GetProducts( $limit: Int, $offset: Int, $categoryId: Float ) {
    products (limit: $limit, offset: $offset, categoryId: $categoryId) {
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
export const GET_All_PRODUCTS: TypedDocumentNode<ResponseProducts, {}> = gql`
  query GetAllProducts {
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
`;
