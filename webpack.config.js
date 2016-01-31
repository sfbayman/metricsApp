var path = require('path');
module.exports = {
  entry: [
    './public/js/main.jsx'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test : /\.jsx?$/,
      loader: 'babel',
        query: {
                presets: ['react', 'es2015']
            }
    }]
  },
  resolve: {
    root: [path.resolve(__dirname, 'public/js'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './'
  }
};
