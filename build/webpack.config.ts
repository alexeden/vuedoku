/// <reference path="./globals.d.ts" />
import * as webpack from 'webpack';
import * as path from 'path';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
const VueLoaderPlugin = require('vue-loader/lib/plugin');

export const config: webpack.Configuration = {
  target: 'web',
  context: path.resolve(process.cwd(), 'src'),
  // devtool: 'cheap-module-eval-source-map',
  devtool: false,

  entry: {
    /* Common */
    vendor: [
      'vue',
      'vuex',
      'material-design-icons'
    ],
    styles: [
      'normalize.css/normalize.css',
      './scss/styles.scss'
    ],
    app: './app.ts'
  },

  output: {
    pathinfo: false,
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: ''
  },

  resolve: {
    extensions: ['.ts', '.js', '.html', '.css', '.vue'],
    modules: ['node_modules'],
    alias: {
      'sudoku': path.resolve(process.cwd(), 'src/'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  // devServer: {
  //   host: 'localhost',
  //   port: 4000,
  //   https: true,
  //   historyApiFallback: true,
  //   contentBase: [ path.join(process.cwd(), 'src') ]
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        /* Core SCSS files inside /src/scss */
        test: /\.(scss|css)$/,
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                // path.resolve(process.cwd(), 'node_modules', 'materialize-css')
              ]
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        use: 'url-loader?name=[name].[hash:20].[ext]&limit=10000'
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      showErrors: true,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: false,
      title: 'Learning Vuex'
    }),

    // new webpack.NamedModulesPlugin(),
    // new webpack.NamedChunksPlugin(chunk =>
    //   chunk.name || chunk.mapModules((m: any) => path.relative(m.context, m.request)).join('_')
    // ),

    // new ExtractTextPlugin({ filename: '[name].css', allChunks: false }),
    new CircularDependencyPlugin({ exclude: /node_modules/ })
  ]
};

export default config;
