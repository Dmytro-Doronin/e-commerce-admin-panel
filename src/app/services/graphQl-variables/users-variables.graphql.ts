import {TypedDocumentNode} from '@apollo/client';
import {gql} from 'apollo-angular';

export const GET_USERS: TypedDocumentNode<ResponseUsersInterface, {}> = gql`
  query GetUsers () {
    users () {
      id
      email
      name
      role
      avatar
    }
  }
`
