module.exports = {
	'extends': [
		'eslint-config-pobedit'
	],

	"parser": "babel-eslint",

	'parserOptions': {
		'sourceType': 'module',
		'ecmaFeatures': {
			'experimentalObjectRestSpread': true,
			"jsx": true
		}
	},

	'plugins': [
		'react'
	],

	'rules': {
		'array-callback-return': 'off',
		'no-mixed-spaces-and-tabs': 'error',
		'no-mixed-requires': 1,
		"react/jsx-filename-extension": [ 1, {
				"extensions": [".js", ".jsx"]
			}
		],

		'no-mixed-spaces-and-tabs': 'off',
		'new-cap': 'off'
	},

	'env': {
		'browser': true,
		'node'   : true,
		'es6'    : true,
		'mocha'  : true
	},

	'globals': {
		'browser': true
	}
};
