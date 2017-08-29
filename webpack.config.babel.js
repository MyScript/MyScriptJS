import path from 'path';

import webpack from 'webpack';

const conf = {
  devtool: 'source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: true
        }
      }
    })
  ],
  context: path.resolve(__dirname, 'src'),
  entry: {
    myscript: './myscript.js'
  },
  module: {
    rules: [{
      // Javascript
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader'
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }, {
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'css-loader'
      }
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].min.js',
    chunkFilename: '[id].min.js',
    library: 'MyScript',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: ['node_modules']
  },
  devServer: {
    inline: true
  }
};

export default conf;
