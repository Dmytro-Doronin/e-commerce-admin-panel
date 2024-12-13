import {TypedDocumentNode} from '@apollo/client';
import {gql} from 'apollo-angular';
import {ResponseUsersInterface} from '../../interfaces/users.interface';

export const GET_USERS: TypedDocumentNode<ResponseUsersInterface, {}> = gql`
  query  {
    users {
      id
      email
      name
      role
      avatar
    }
  }
`
