const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let entries;

function getEntries() {
  if (entries) return entries;

  entries = {};
  const ctx = path.resolve(__dirname);
  let files = fs.readdirSync(ctx);
  files = files.filter((file) => {
    if (file === path.basename(__filename)) return false;
    if (file.endsWith('.js')) return true;
    return false;
  });
  files.forEach((file) => {
    const chunk = path.basename(file, '.js');
    entries[chunk] = path.resolve(__dirname, file);
  });

  return entries;
}

function getHtmlPlugins() {
  const files = getEntries();
  return Object.keys(files).map(chunk => new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, 'build', 'html', `${chunk}.html`),
    chunks: [chunk],
  }));
}

module.exports = {
  mode: 'development',
  entry: getEntries,
  output: {
    path: path.resolve(__dirname, 'build', 'script'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname),
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
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    ...getHtmlPlugins(),
  ],
  devtool: 'eval-source-map',
};
