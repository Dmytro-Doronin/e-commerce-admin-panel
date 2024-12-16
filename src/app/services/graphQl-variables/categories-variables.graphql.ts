import {TypedDocumentNode} from '@apollo/client';
import {gql} from 'apollo-angular';
import {
  CreateCategoryDto, ResponseCategories,
  ResponseCategory,
  ResponseCategoryForAdd, ResponseDeleteCategory, ResponseUpdateCategory, UpdateCategoryDto
} from '../../interfaces/category.interface';
import {ResponseDeleteProduct, UpdateProductDto} from '../../interfaces/products.interface';

export const GET_CATEGORIES: TypedDocumentNode<ResponseCategories, {}> = gql`
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

export const GET_SINGLE_CATEGORY: TypedDocumentNode<ResponseCategory, {id: number}> = gql`
  query GetSingleCategory ( $id: ID! ) {
    category (id: $id) {
      id
      name
      image
    }
  }
`

export const UPDATE_CATEGORY: TypedDocumentNode<ResponseUpdateCategory, { id: number; changes: Partial<UpdateCategoryDto> }> = gql`
  mutation UpdateCategory ( $id: ID!, $changes: UpdateCategoryDto! ) {
    updateCategory (id: $id, changes: $changes) {
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
