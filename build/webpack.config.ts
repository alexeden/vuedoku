/// <reference path="./webpack.declarations.d.ts" />
import * as webpack from 'webpack';
// import * as chalk from 'chalk';
import * as path from 'path';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import * as docLoader from './loaders/doc-loader';

console.log(JSON.stringify(docLoader, null, 3));

export const config: webpack.Configuration = {
  target: 'web',
  context: path.resolve(process.cwd(), 'src'),
  devtool: 'cheap-module-eval-source-map',

  entry: {
    /* Common */ vendor: [
      'vue',
      'vuex',
      'material-design-icons'
    ],
    styles: [
      'basscss/css/basscss.css',
      './scss/styles.scss'
    ],
    app: './app.ts'
  },

  output: {
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

  devServer: {
    host: 'localhost',
    port: 4000,
    https: true,
    historyApiFallback: true,
    contentBase: [ path.join(process.cwd(), 'src') ]
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: path.resolve(__dirname, 'loaders', 'doc-loader.ts'),
            // loader: 'doc-loader',
            options: {}
          },
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                // the "scss" and "sass" values for the lang attribute to the right configs here.
                // other preprocessors should work out of the box, no loader config like this necessary.
                // 'scss': 'vue-style-loader!css-loader!sass-loader',
                // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        /* Core SCSS files inside /src/scss */
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(process.cwd(), 'node_modules', 'materialize-css')
                ]
              }
            }
          ]
        })
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
    new CleanWebpackPlugin(['dist'])
  ]
};

export default config;
