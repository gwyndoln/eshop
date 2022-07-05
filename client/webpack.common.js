const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	module: {
		rules: [
			// {
			// 	test: /\.tsx?$/,
			// 	include: path.resolve(__dirname, 'src'), // exclude: /node_modules/,
			// 	use: 'ts-loader',
			// },
			{
				test: /\.(png|jpg|gif|svg|jpeg|webp)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		pathinfo: false,
		// assetModuleFilename: '[name][ext]',
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.ts', '.tsx', '.js'],
		mainFiles: ['index'],
		descriptionFiles: ['package.json'],
		symlinks: false,
		cacheWithContext: false,
	},
	// cache: {
	// 	type: 'filesystem',
	// 	buildDependencies: {
	// 		config: [__filename],
	// 	},
	// },
	// optimization: {
	// 	moduleIds: 'deterministic',
	// 	runtimeChunk: 'single',
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'all',
	// 			},
	// 		},
	// 	},
	// },
};
