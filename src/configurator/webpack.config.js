const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/configurator/src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, '../../public/js'),
  },
};
