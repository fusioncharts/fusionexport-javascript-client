const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
};
