import path from 'path';

module.exports = {
	entry: {
	  preload: './target/MyScript.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '../dist/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	},
    resolve: {
      modulesDirectories: ['node_modules']
    }
};