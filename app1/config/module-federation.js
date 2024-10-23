const deps = require('../package.json').dependencies;
const { UniversalFederationPlugin } = require('@module-federation/node');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const FederationStatsPlugin = require('webpack-federation-stats-plugin');

const shared = [{
  react: deps.react, 'react-dom': deps['react-dom'], graphql: deps.graphql,
  '@apollo/client': {
    singleton: true,
    requiredVersion: deps['@apollo/client'],
  },
  'node-fetch': deps['node-fetch'],
  'serialize-javascript': deps['serialize-javascript']
}]
module.exports = {
  client: [
    new FederationStatsPlugin(),
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3001/static/remoteEntry.js',
      },
      shared: shared
    }),
  ],
  server: [
    new UniversalFederationPlugin({
      isServer: true,
      name: 'app1',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remoteType: 'script',
      remotes: {
        app2: 'app2@http://localhost:3001/server/remoteEntry.js',
      },
      shared: shared
    }),
  ],
};
