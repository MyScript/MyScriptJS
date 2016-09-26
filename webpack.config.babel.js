import path from 'path';

module.exports = {
  devtool: 'sourcemap',
  entry: {
    MyScriptJS: './target/MyScriptJS.js'
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
  }
};