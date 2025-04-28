import './global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider } from '@apollo/client';

// import client from '@/graphql/client';
import App from './App';
import { ThemeProvider } from './components/theme-provider';
import { client } from './graphql/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
