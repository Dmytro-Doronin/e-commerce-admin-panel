
import { ApolloLink } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'
import { inject } from '@angular/core'
import { HttpLink } from 'apollo-angular/http'

export const apolloConfig = () => {
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({
      uri: 'https://api.escuelajs.co/graphql',
    }),
    cache: new InMemoryCache(),
  };
};
