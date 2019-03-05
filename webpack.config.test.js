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
                'rewire',
              ],
            },
          },
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
};
