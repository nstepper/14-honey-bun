const path = require('path');

module.exports = {
  entry: './public/index.js', // The entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // The output directory
    filename: 'bundle.js', // The name of the bundled file
  },
};
