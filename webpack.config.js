const path = require('path');

const mode = process.env.WEBPACK_ENV || 'development';
const devtool = mode === 'production' ? null : 'source-map';

module.exports = {
  mode,
  entry: './src/FusionExport.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'FusionExport',
    libraryTarget: 'umd',
    umdNamedDefine: true,
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
  devtool,
};
