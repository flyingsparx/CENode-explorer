module.exports = {
  // This is the "main" file which should include all other modules
  entry: './src/main.js',
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: './dist',
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
  },
  module: {
    // Special compilation rules
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
      }
    ],
		vue: {
			loaders: {
				js: 'babel-loader'
			}
		}
  }
}
