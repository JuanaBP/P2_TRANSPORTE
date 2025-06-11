// src/Apollo/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI, //API GraphQL URL
  cache: new InMemoryCache(),
});

export default client;


