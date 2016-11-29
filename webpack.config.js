// var path = require('path');
// var webpack = require('webpack');

// module.exports = {
// 	entry: './src/index.js',
// 	output: {
// 		path: path.join(__dirname, 'dist/js'),
// 		publicPath: '/dist/js',
// 		filename: 'index.js'
// 	},
// 	inline: true,
// 	module: {
// 		preLoaders: [
// 				{ test: /\.json$/, exclude: /node_modules/, loader: 'json'},
// 		],
// 		loaders: [
// 			{
// 				test: /.jsx?$/,
// 				loader: 'babel-loader',
// 				exclude: /node_modules/,
// 				query: {
// 					presets: ['es2015','stage-0', 'react']
// 				}
// 			},
// 			{
// 				test: /node_modules\/JSONStream\/index\.js$/,
// 				loaders: ['shebang', 'babel']
// 			}
// 		]
// 	},
// };

var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
var env = process.env.NODE_ENV;
var CHOOSE_CONFIG = process.env.CHOOSE_CONFIG;

// for lib build
var lib_config = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/dist/js",
		filename: 'index.js'
	},
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

// for examples build
var examples_config = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/dist/js/",
		filename: 'index.js'
	},
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

var final_config;
switch(CHOOSE_CONFIG) {
	case 'UMD':
		final_config = umd_config;
	break;
	case 'LIB':
		final_config = lib_config;
	break;
	case 'EXAMPLES':
	default:
		final_config = examples_config;
	break;
}
module.exports = final_config;
