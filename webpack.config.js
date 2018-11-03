'use strict';

const path = require('path');
const {LoaderOptionsPlugin, DefinePlugin, optimize} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin-loader');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const dotenvSafe = require('dotenv-safe').load();
const pkg = require('./package.json');

module.exports = ({production = false, ssr = false, lite = false} = {}) => {
  process.env.NODE_ENV = production ? 'production' : 'development';

  // output filenames for main and chunks
  const output = {
    path: path.resolve(__dirname, './build'),
    filename: production ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: production ? '[name].[chunkhash].js' : '[name].js'
  };

  // source map config
  const sourceMap =  production ? 'cheap-module-source-map' : 'source-map';

  // firebase configs
  const firebaseConfig = JSON.stringify({
    apiKey: process.env.FIREBASE_API_KEY,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });

  // redirect the request of importing react to react-lite
  const resolve = {
    alias: lite ? {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    } : {}
  };

  // webpack default configs
  const webpackConfig = {
    entry: {
      main: ['./src/main.js'],
      vendor: (lite ? [] : ['./src/stdlib.js']).concat(['react', 'react-dom'])
    },
    output,
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loaders: 'babel-loader'
      }]
    },
    devtool: sourceMap,
    resolve,
    plugins: [
      new optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new optimize.CommonsChunkPlugin({
        children: true,
        async: 'common',
        minChunks: 2
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        firebaseConfig: firebaseConfig
      }),
      new HtmlWebpackPlugin(Object.assign({
        filename: `index.${ssr ? 'ejs' : 'html'}`,
        template: './src/views/index.ejs',
        favicon: './public/favicon.ico',
        markup: `<div id="app">${ssr ? '<%- markup %>' : ''}</div>`
      }, production ? {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      } : {})),
      new InlineChunkManifestHtmlWebpackPlugin({
        filename: "chunk-manifest.json",
        chunkManifestVariable: 'webpackChunkManifest',
        dropAsset: true
      }),
      new PreloadWebpackPlugin({
        include: ['common', 'greeting']
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
        include: ['users', 'notification']
      }),
      new CopyWebpackPlugin([{
        context: './public',
        from: '*.*'
      }, {
        from: './src/firebase-messaging-sw.js',
        to: 'firebase-messaging-sw.js',
        transform: c => {
          return c.toString().replace(/firebaseConfig/, firebaseConfig)
        }
      }]),
      new SWPrecacheWebpackPlugin({
        cacheId: `${pkg.name}-${pkg.version}`,
        staticFileGlobs: [
          path.join(output.path, '**/*')
        ],
        runtimeCaching: [{
          urlPattern: /https:\/\/.+.firebaseio.com/,
          handler: 'networkFirst'
        }],
        logger: function () {},
        filename: 'sw.js',
        minify: production
      })
    ],
    devServer: {
      contentBase: './public',
      inline: true,
      host: 'localhost',
      port: 8080
    }
  };

  // webpack additional build for production ready version
  if (production) {
    webpackConfig.plugins = webpackConfig.plugins.concat([
      // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
      new optimize.UglifyJsPlugin({
        sourceMap,
        mangle: true,
        beautify: false,
        comments: false,
        // http://lisperator.net/uglifyjs/compress
        compress: {
          unused: true,
          dead_code: true,
          warnings: false,
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true,
          sequences: true,
          booleans: true,
        },
        extractComments: true
      }),
      new LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    ]);
  }

  return webpackConfig;
};
