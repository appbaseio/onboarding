var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'dist/js'),
		publicPath: '/dist/js',
		filename: 'index.js'
	},
	inline: true,
	module: {
		preLoaders: [
				{ test: /\.json$/, exclude: /node_modules/, loader: 'json'},
		],
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015','stage-0', 'react']
				}
			},
			{
				test: /node_modules\/JSONStream\/index\.js$/,
				loaders: ['shebang', 'babel']
			}
		]
	},
};