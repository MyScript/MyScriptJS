import path from 'path';
import WebpackBrowserPlugin from 'webpack-browser-plugin';
import WebpackDevServer from 'webpack-dev-server';
import WebpackNotifierPlugin from 'webpack-notifier';
import webpack from 'webpack';

module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new WebpackNotifierPlugin({ title: 'Webpack', excludeWarnings: true }),
    new webpack.HotModuleReplacementPlugin()
  ],
  entry: {
    MyScriptJS: './src/MyScriptJS.js'
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
    publicPath: 'dist/',
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
