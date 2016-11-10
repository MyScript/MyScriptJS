import path from 'path';

import webpack from 'webpack';

const conf = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin()
  ],
  entry: {
    myscript: './src/myscript.js'
  },
  module: {
    preLoaders: [
      // Javascript
      { test: /\.jsx?$/, loader: 'eslint', include: /src/ }
    ],
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
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  devServer: {
    inline: true,
    // contentBase: '/samples'
  }
};

export default conf;
