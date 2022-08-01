const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		compress: true,
		port: 3000,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: path.resolve(__dirname, 'src'), // exclude: /node_modules/,
				use: 'ts-loader',
			},
		],
	},
	plugins: [new ESLintPlugin({ extensions: ['tsx', 'ts'] })],
});
