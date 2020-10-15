let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    staff: './src/main-staff.js',
    student: './src/main-student.js',
    advisor: './src/main-advisor.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: ['html-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'staff.html',
      chunks: ['staff']
    }),
    new HtmlWebpackPlugin({
      template: 'src/student.html',
      filename: 'student.html',
      chunks: ['student']
    }),
    new HtmlWebpackPlugin({
      template: 'src/advisor.html',
      filename: 'advisor.html',
      chunks: ['advisor']
    })
  ]
}
