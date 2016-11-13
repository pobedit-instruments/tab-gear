let path = require('path');

let Webpack = require('webpack');
let PreCSS = require('precss');
let PostCSSImport = require('postcss-import');
let WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
let findCacheDir = require('find-cache-dir');

const DIR_NAME = path.join(__dirname, '../..');

module.exports = {
	target: 'web',
	devtool: 'eval-source-map',
	debug: true,

	entry: [
		'webpack-hot-middleware/client',
		'./locale/ru/messages.json',
		'./config.js',
		'./views/index.js'
	],

	file: `${DIR_NAME}/views/index.html`,

	output: {
		path: `${DIR_NAME}/cache`,
		filename: '[name].js',
		publicPath: '/'
	},

	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.css'],

		alias: {
			'sinon': 'sinon/pkg/sinon',
			'chrome': 'chrome-stub'
		}
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
		new Webpack.HotModuleReplacementPlugin(),
		new Webpack.NoErrorsPlugin(),
		new WatchMissingNodeModulesPlugin(`${DIR_NAME}/node_modules`),

		new Webpack.ProvidePlugin({
			'chrome': 'chrome-stub'
		}),

		new Webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
	],

	module: {
		// It's used to suppress warnings about chrome-stub
		exprContextCritical: false,

		noParse: [
			/sinon/
		],

		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',

				include: [
					`${DIR_NAME}/views`,
					`${DIR_NAME}/stubs`,
					`${DIR_NAME}/config.js`
				],

				query: {
					cacheDirectory: findCacheDir({
						name: 'babel'
					})
				}
			},

			{
				test: /sinon.*\.js$/,
				loader: 'imports?define=>false,require=>false'
			},

			{
				test: /\.json/,
				loader: 'json'
			},

			{
				test: /\.css$/,
				loader: 'style!css?importLoaders=1!postcss'
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
			})
		];
	}
};
