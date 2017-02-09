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
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            scss: 'vue-style-loader!css-loader!sass-loader' // <style lang="scss">
          }
        }
      },
      { test: /\.css$/, loader: "css-loader" }
    ]
  }
}
