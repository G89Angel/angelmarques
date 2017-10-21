const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});


const fileHash = '[name].[hash:6].[ext]';

const styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true
  }
};

const resolveUrlLoader = {
  loader: "resolve-url-loader",
  options: {
    sourceMap: true
  }
}


module.exports = {
  entry: {
    styles: path.resolve(__dirname, 'assets', 'css', 'base.scss'),
    layout: path.resolve(__dirname, 'assets', 'js', 'layout.js')
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: "[name].js",
    publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          styleLoader,
          cssLoader
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [cssLoader, resolveUrlLoader, sassLoader],
          // use style-loader in development
          fallback: styleLoader
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: fileHash
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [
        {
          loader: "url-loader?limit=10000&mimetype=application/font-woff",
          options: {
            name: fileHash
          }
        }
      ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: fileHash
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    extractSass
  ],
  devtool: 'inline-source-map'
};