const path = require('path');
const merge = require('webpack-merge');

const mode = process.env.WEBPACK_ENV || 'development';

const common = {
  entry: './src/FusionExport.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'FusionExport',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'cover 90%',
                  },
                ],
              ],
              plugins: [
                '@babel/plugin-transform-modules-umd',
                'add-module-exports',
              ],
            },
          },
        ],
      },
    ],
  },
};

const minified = {
  mode: 'production',
  output: {
    filename: 'index.min.js',
  },
};

const sourcemaped = {
  mode: 'development',
  output: {
    filename: 'index.js',
  },
  devtool: 'eval-source-map',
};

const config = mode === 'production'
  ? [merge(minified, common), merge(sourcemaped, common)]
  : merge(sourcemaped, common);

module.exports = config;
