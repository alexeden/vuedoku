const path = require('path'); 

module.exports = {
  components: '../src/components/**/*.vue',
  webpackConfig: {
    context: path.resolve(process.cwd(), 'src'),
    resolve: {
      extensions: ['.ts', '.js', '.html', '.css', '.vue'],
      modules: ['node_modules'],
      alias: {
        'sudoku': path.resolve(process.cwd(), 'src/'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              ts: 'ts-loader'
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
      ],
    },
  },
  showUsage: true,
  vuex: '../src/store/index',
};
