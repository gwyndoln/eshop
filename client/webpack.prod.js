const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: '[name].[contenthash].js', // bundle/[contenthash]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: path.resolve(__dirname, 'src'), // exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheCompression: false,
							cacheDirectory: true,
							presets: [
								['@babel/preset-env', { targets: 'defaults' }], // target browsers
								['@babel/preset-react'],
							],
						},
					},
					'ts-loader',
				],
			},
			{
				test: /\.(png|jpg|gif|svg|jpeg)$/i,
				type: 'asset/resource',
			},
		],
	},
});
