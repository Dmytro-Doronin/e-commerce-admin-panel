import {TypedDocumentNode} from '@apollo/client';
import {CreateProductInput, ResponseProducts, ResponseProductsForAdd} from '../../interfaces/products.interface';
import {gql} from 'apollo-angular';

export const GET_PRODUCTS: TypedDocumentNode<ResponseProducts, { limit: number, offset: number, categoryId: number }> = gql`
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
  query GetAllProducts ( $categoryId: Float ) {
    products (categoryId: $categoryId) {
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

export const ADD_NEW_PRODUCT: TypedDocumentNode<
  ResponseProductsForAdd,
  { data: CreateProductInput }
> = gql`
  mutation AddNewProduct($data: CreateProductInput!) {
    addProduct(data: $data) {
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

// export const ADD_NEW_PRODUCT: TypedDocumentNode<
//   ResponseProductsForAdd,
//   { title: string; price: number; categoryId: number; description: string; images: string[] }
// > = gql`
//   mutation AddNewProduct(
//     $title: String!
//     $price: Float!
//     $categoryId: Int!
//     $description: String!
//     $images: [String!]!
//   ) {
//     addProduct(
//       data: {
//         title: $title
//         price: $price
//         description: $description
//         categoryId: $categoryId
//         images: $images
//       }
//     ) {
//       title
//       price
//       description
//       images
//       category {
//         id
//         name
//         image
//       }
//     }
//   }
// `;


