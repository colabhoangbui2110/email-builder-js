// src/graphql/client.js
import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client';

// Define the HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: import.meta.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8000/admin/api/v3/graphql/', // Use environment variable or default
});

// Optional: Add middleware for authentication (e.g., adding Authorization header)
const authMiddleware = new ApolloLink((operation, forward) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('sbase_shop-access-token') || '02a1ad78979b95463e5ddf46811c7444038490450183eccc0d065f60aa145ba6';

  // Add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'X-ShopBase-Access-Token': token,
      'X-Shop-ID': 10340282,
      'X-User_ID': 91754,
    },
  }));

  return forward(operation);
});

// Create the Apollo Client instance
export const client = new ApolloClient({
  // Use concat to chain middleware (like auth) with the HTTP link
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  // Enable Apollo DevTools extension in development
  // uri: import.meta.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8000/admin/api/v3/graphql/', // Use environment variable or default
  uri: 'http://localhost:8000/admin/api/v3/graphql/', // Use environment variable or default
  connectToDevTools: process.env.NODE_ENV === 'development',
});

// const client1 = new ApolloClient({
  // uri: import.meta.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8000/admin/api/v3/graphql/',
  // cache: new InMemoryCache(),
// });

export default client;
