const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		 './node_modules/jquery/dist/jquery.min.js',
		 './app/app.js'
	],
	externals: {
		jquery: 'jQuery',
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jquery': 'jQuery',
			'jquery': 'jquery',
		})
	],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'app')
				 ],
		alias:{
			appStyles:'./app/styles/styles.scss',
		},
		extensions: ['.js', '.jsx', '.css', '.scss']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules | bower_component)/
			}
		]
	},
	devtool: 'cheap-module-eval-source-map',
}
