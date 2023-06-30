const path = require('path');
const { resolve } = require('url');
const { rejects } = require('assert');

module.exports = {

    resolve: {
        extensions: ['.js', '.jsx'],
    
        fallback: {
          util: require.resolve('util/'),
          url: require.resolve('url/'),
        },
        fallback: {
            crypto: require.resolve('crypto-browserify')
          },
      },
  entry: './public/index.js', // The entry point of your application
  output: {
    path: path.resolve(__dirname, 'public', 'dist'), // Output folder path relative to the root
    filename: 'bundle.js', // Output bundle filename
    publicPath: '/dist/', // Public path for serving the bundle
  },
};
