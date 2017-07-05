const path = require('path');

module.exports = {
	entry: [
		     './app/app.js',
		    ],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'app')],
		extensions: ['.js', '.jsx', '.css', '.scss']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react','es2015']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules | bower_component)/
             }
       ]
	},
	devtool: 'cheap-module-eval-source-map',
}
