import {TypedDocumentNode} from '@apollo/client';
import {gql} from 'apollo-angular';
import {
  CreateCategoryDto,
  ResponseCategory,
  ResponseCategoryForAdd, ResponseDeleteCategory
} from '../../interfaces/category.interface';
import {ResponseDeleteProduct} from '../../interfaces/products.interface';

export const GET_CATEGORIES: TypedDocumentNode<ResponseCategory, {}> = gql`
  query {
    categories {
      id
      name
      image
    }
  }
`
export const ADD_NEW_CATEGORY: TypedDocumentNode<
  ResponseCategoryForAdd,
  { data: CreateCategoryDto }
> = gql`
  mutation AddNewCategory($data: CreateCategoryDto!) {
    addCategory(data: $data) {
        id
        name
        image
    }
  }
`
export const DELETE_CATEGORY: TypedDocumentNode<ResponseDeleteCategory, { id: number }> = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`
