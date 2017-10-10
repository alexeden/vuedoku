/// <reference path="./webpack.declarations.d.ts" />
import * as webpack from 'webpack';
// import * as chalk from 'chalk';
import * as path from 'path';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

export const config: webpack.Configuration = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  devtool: 'cheap-module-eval-source-map',

  entry: {
    /* Common */ vue: [
      'vue',
      'vuex'
    ],
    styles: [
      './scss/styles.scss'
    ],
    app: './app.ts'
  },

  output: {
    path: path.resolve(__dirname, 'deploy'),
    filename: '[name].[chunkhash].js',
    publicPath: ''
  },

  resolve: {
    extensions: ['.ts', '.js', '.html'],
    modules: ['node_modules'],
    alias: {
      'sudoku': path.resolve(__dirname, 'src/'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  devServer: {
    host: 'localhost',
    port: 4000,
    https: true,
    historyApiFallback: true,
    contentBase: [ path.join(__dirname, 'src') ]
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        /* Core SCSS files inside /src/scss */
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules', 'materialize-css')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.ts$/,
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(__dirname, 'src', 'tsconfig.json')
          }
        }]
      },
      {
        test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        use: 'url-loader?name=[name].[hash:20].[ext]&limit=10000'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      showErrors: true,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: false,
      title: 'Learning Vuex'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vue'],
      // tells Webpack we really only want what we specified in the entry
      minChunks: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(chunk =>
      chunk.name || chunk.mapModules((m: any) => path.relative(m.context, m.request)).join('_')
    ),

    new ExtractTextPlugin({ filename: '[name].css', allChunks: false }),
    new CircularDependencyPlugin({ exclude: /node_modules/ }),
    new CleanWebpackPlugin(['deploy'])
  ]
};

export default config;
