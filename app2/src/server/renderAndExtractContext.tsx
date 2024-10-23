import React from 'react';
// import { Request } from 'express';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ApolloProvider } from '@apollo/client';
import { renderToStringWithData } from '@apollo/client/react/ssr';

import { createApolloClient } from '../client/apolloClient';

// import App from '../client/components/App';

export type RenderAndExtractContextOptions = {
  // req: Request;
  chunkExtractor: ChunkExtractor;
};
export type RenderAndExtractContextResult = {
  markup: string;
  linkTags: string;
  scriptTags: string;
  serverRenderedApplicationState: object;

};

export type RenderAndExtractContextFunction = (
  options: RenderAndExtractContextOptions,
) => Promise<RenderAndExtractContextResult>;

export async function renderAndExtractContext({
  // express objects
  // req,
  // @loadable chunk extractor
  chunkExtractor,
}: RenderAndExtractContextOptions) {
  const { default: App } = await import('../client/components/App');
  const { apolloClient } = createApolloClient({
    ssrMode: true,
    fetch,
  });

  // ================ WORKAROUND ================
  // This not work, The ChunkExtractorManager context provider
  // do not pass the chunkExtractor to the context consumer (ChunkExtractorManager)
  // const markup = await renderToString(chunkExtractor.collectChunks(<App />));

  const markup = await renderToStringWithData(
    <ChunkExtractorManager {...{ extractor: chunkExtractor }}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </ChunkExtractorManager>
  );


  const apolloData = apolloClient.extract();

  const serverRenderedApplicationState = {
    apolloData,
  };
  // ================ WORKAROUND ================

  const linkTags = chunkExtractor.getLinkTags();
  const scriptTags = chunkExtractor.getScriptTags();

  return {
    markup,
    linkTags,
    scriptTags,
    serverRenderedApplicationState
  };
}
