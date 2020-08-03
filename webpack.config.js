const path = require('path');

module.exports = {
	entry: './main.js',
	mode: 'development',
	optimization: {
		minimize: false,
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'ToyReact.createElement' }]],
					},
				},
			},
		],
	},
};
