module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'build.js'
  },
  resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
  },
  module: {
    loaders: [
			 {
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			},
      {
        test: /\.vue$/,
				exclude: /(node_modules|bower_components)/,
        loader: 'vue-loader'
      },
      { test: /\.css$/, loader: "css-loader" }
    ],
		vue: {
			loaders: {
				js: 'babel-loader'
			}
		}
  }
}
