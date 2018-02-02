var path = require('path');
var webpack = require('webpack');

console.log(path.resolve(__dirname, 'src/js/components'))

module.exports = {
   entry: {
     main: './src/js/bundles/main.js',
     deputy: './src/js/bundles/deputy.js',
     attendance: './src/js/bundles/attendance.js'
   },
   output: {
       path: path.resolve(__dirname, 'dist/js'),
       filename: "[name].bundle.js"
   },
   module: {
       loaders: [
           {
               // test: /\.js$/,
               test: /\.jsx?$/,
               loader: 'babel-loader',
               query: {
                   presets: ['react', 'es2015', 'stage-0']
               }
           },
           {
              test: /\.(html)$/,
              use: {
                loader: 'html-loader',
                options: {
                  attrs: [':data-src']
                }
              }
          }
       ]
   },
   stats: {
       colors: true
   },
   devtool: 'source-map',
   resolve: {
     modules: [
        'node_modules',
        'node_modules/react-echarts-v3/src',
        path.resolve(__dirname, 'src/js/components'),
        path.resolve(__dirname, 'src/js/template')
    ],
    extensions: ['.js', '.jsx']
   }
};
