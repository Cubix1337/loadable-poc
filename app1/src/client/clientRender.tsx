import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './apolloClient';

import { loadableReady } from '@loadable/component';

import App from './components/App';

const { apolloClient, apolloCache } = createApolloClient({ fetch });


if (typeof window !== 'undefined') {
  const { apolloData } = window['__CLIENT_CONFIG__'];
  apolloCache.restore(apolloData);
}

// const render = App => {
  loadableReady(() => {
    const root = document.getElementById('root');

    ReactDOMClient.hydrateRoot(
      root,
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    );
  })
// };

// render(App);