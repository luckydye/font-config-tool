const path = require('path');
const fs = require('fs');

if (process.env.NODE_ENV === "production") {
  fs.copyFileSync(path.resolve('./font-registry.json'),
    path.resolve('../../dist/font-registry.json'));
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/main.ts',
  module: {
    rules: [
      { 
        test: /\.(html|css|json)$/, 
        loader: 'file-loader',
        options: {
          outputPath: '.',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'configurator.js',
    path: path.resolve(__dirname, '../../dist'),
  },
};
