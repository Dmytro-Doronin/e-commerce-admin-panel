import {TypedDocumentNode} from '@apollo/client';
import {gql} from 'apollo-angular';
import {ResponseUsersInterface} from '../../interfaces/users.interface';

export const GET_USERS: TypedDocumentNode<ResponseUsersInterface, {limit: number}> = gql`
  query GetUsers($limit: Float!) {
    users (limit: $limit) {
      id
      email
      name
      role
      avatar
    }
  }
`
export const GET_ALL_USERS: TypedDocumentNode<ResponseUsersInterface, {}> = gql`
  query {
    users {
      id
      email
      name
      role
      avatar
    }
  }
`
