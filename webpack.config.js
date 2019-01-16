const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/FusionExport.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'FusionExport',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
  devtool: isProd ? 'eval-source-map' : false,
};
