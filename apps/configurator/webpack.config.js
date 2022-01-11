const path = require('path');
const fs = require('fs');

if(!fs.existsSync(path.resolve('../../dist')))
  fs.mkdirSync(path.resolve('../../dist'));

fs.copyFileSync(path.resolve('./configurator.css'),
  path.resolve('../../dist/configurator.css'));

fs.copyFileSync(path.resolve('./configurator.html'),
  path.resolve('../../dist/configurator.html'));

fs.copyFileSync(path.resolve('./font-registry.json'),
  path.resolve('../../dist/font-registry.json'));

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
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
    filename: 'configurator.js',
    path: path.resolve(__dirname, '../../dist/configurator'),
  },
};
