let HtmlWebpackPlugin = require('html-webpack-plugin');
let backend = null;
try {
  backend = require('./backend');
}
catch(e) {
  backend = {
    target: 'http://112.137.129.214:15980',
    secure: false,
  }
}
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
  ],
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    host: '0.0.0.0',
    port: 8000,
    proxy: {
      '/stafflogin': backend,
      '/studentlogin': backend,
      '/advisorlogin': backend,
      '/guestlogin': backend,
      '/semesters': backend,
      '/quotas':backend,
      '/staffs': backend,
      '/students': backend,
      '/advisors': backend,
      '/projecttypes': backend,
      '/projects': backend,
      '/guestadvisors': backend,
      '/attachments': backend,
      '/logout': backend,
      '/projectStudentRels': backend,
      '/projectAdvisorRels': backend,
      '/static/icons':backend
    }
  }
}
