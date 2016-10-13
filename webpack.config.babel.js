import path from 'path';
import WebpackBrowserPlugin from 'webpack-browser-plugin';

module.exports = {
  devtool: 'source-map',
  plugins: [
    new WebpackBrowserPlugin()
  ],
  entry: {
    MyScriptJS: './new_src/MyScriptJS.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '../dist/',
    filename: '[name].min.js',
    chunkFilename: '[id].min.js',
    library: ['MyScript'],
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  devServer: {
    inline: true,
    // contentBase: '/samples'
  }
};
