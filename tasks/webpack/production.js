let path = require('path');

let Webpack = require('webpack');
let Autoprefixer = require('autoprefixer');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ESLintFriendlyFormatter = require('eslint-friendly-formatter');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let PostCSSImport = require('postcss-import');
let PreCSS = require('precss');
let StatsPlugin = require('stats-webpack-plugin');
let UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').default;
let ZipPlugin = require('zip-webpack-plugin');
let FindCacheDir = require('find-cache-dir');

const DIR_NAME = path.join(__dirname, '../..');

module.exports = {
	target: 'web',
	// devtool: 'source-map',

	profile: true,
	progress: true,

	stats: {
		children: false
	},

	entry: [
		'./config.js',
		'./views/index.js'
	],

	file: `${DIR_NAME}/views/index.html`,

	output: {
		path: `${DIR_NAME}/cache/build`,
		filename: '[name].js'
	},

	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.css']
	},

	node: {
		__dirname: true,

		// Some libraries import Node modules but don't use them in the browser.
		// Tell Webpack to provide empty mocks for them so importing them works.
		fs : 'empty',
		net: 'empty',
		tls: 'empty'
	},

	plugins: [
		new Webpack.optimize.OccurenceOrderPlugin(),
		new Webpack.optimize.DedupePlugin(),

		new Webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),

		new CleanWebpackPlugin(['cache'], {
			root: DIR_NAME,
			verbose: true
		}),

		new ExtractTextPlugin('[name].css', {
			allChunks: true
		}),

		new OptimizeCssAssetsPlugin(),

		new Webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings : false,
				screw_ie8: true
			},

			minimize: true,
			comments: true
		}),

		new CopyWebpackPlugin([
			{
				from: 'locale',
				to: '_locales'
			},

			{
				from: 'files/icons/**/*'
			},

			{
				from: 'manifest.json'
			},

			{
				from: 'index.html'
			},

			{
				from: 'ga.js'
			},

			{
				from: 'views/containers/Options',
				to: 'options'
			}
		]),

		new ZipPlugin({
			path: '.',
			filename: 'build.zip'
		}),

		new UnusedFilesWebpackPlugin({
			pattern: '**/*.*',
			globOptions: {
				cwd: path.join(process.cwd(), 'views')
			}
		})

		// new StatsPlugin('stats.json', {
		// 	chunkModules: true,
		// 	exclude: [ ]
		// })
	],

	module: {
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'eslint-loader',
				exclude: /node_modules|/
			}
		],

		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',

				include: [
					`${DIR_NAME}/views`,
					`${DIR_NAME}/config.js`
				],

				query: {
					cacheDirectory: FindCacheDir({
						name: 'babel'
					})
				}
			},

			{
				test: /\.json/,
				loader: 'json'
			},

			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style', 'css?importLoaders=1&-autoprefixer!postcss')
			},

			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'base64-inline-loader'
			}
		]
	},

	postcss (Webpack) {
		return [
			PreCSS,

			PostCSSImport({
				addDependencyTo: Webpack
			}),

			Autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'not ie < 9'
				]
			})
		];
	},

	eslint: {
		configFile: `${DIR_NAME}/.eslintrc.js`,
		formatter: ESLintFriendlyFormatter,
		fix: true,
		cache: true
	}
};
