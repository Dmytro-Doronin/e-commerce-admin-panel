import {TypedDocumentNode} from '@apollo/client';
import {gql} from 'apollo-angular';
import {ResponseCategory} from '../../interfaces/category.interface';

export const GET_CATEGORIES: TypedDocumentNode<ResponseCategory, {}> = gql`
  query {
    categories {
      id
      name
      image
    }
  }
`
