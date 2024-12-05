import {TypedDocumentNode} from '@apollo/client';
import {
  CreateProductDto, Product,
  ResponseDeleteProduct,
  ResponseProducts,
  ResponseProductsForAdd
} from '../../interfaces/products.interface';
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

export const GET_SINGLE_PRODUCTS: TypedDocumentNode<Product, {id: string}> = gql`
  query GetSingleProducts ( $id: ID! ) {
    product (id: $id) {
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

export const DELETE_PRODUCT: TypedDocumentNode<ResponseDeleteProduct, { id: number }> = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`


export const ADD_NEW_PRODUCT: TypedDocumentNode<
  ResponseProductsForAdd,
  { data: CreateProductDto }
> = gql`
  mutation AddNewProduct($data: CreateProductDto!) {
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



