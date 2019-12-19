const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const templateConfig = require('./configs/templateConfig');
const devServerConfig = require('./configs/devServerConfig');

const isProd = process.env.NODE_ENV === 'production';
const analyzer = process.env.ANALYZE === '1';
const isDeploy = process.env.DEPLOY === '1';
const cleanWebpackPlugin = new CleanWebpackPlugin();
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development',
    isProd,
    analyzer
  }),
  new HtmlWebpackPlugin(templateConfig.indexConfig),
  new HardSourceWebpackPlugin()
];

if (isDeploy) {
  plugins.push(cleanWebpackPlugin);
} else {
  plugins.push(hotModuleReplacementPlugin);
}

module.exports = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [{
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true',
        // loader: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            // IE 9+ Capatability
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [postcssPresetEnv()]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jp?g|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            outputPath: 'assets/images/'
          }
        }]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre'
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10 * 1024,
          noquotes: true
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|xlsx|xls|unl)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts/'
          }
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': path.join(__dirname, 'src'),
      '@components': path.join(__dirname, 'src/components')
    }
  },
  entry: [
    '@babel/polyfill',
    './src/index.tsx'
  ],

  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "redux": "Redux"
  },
  devServer: devServerConfig,
  plugins,
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunks-lib',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        antd: {
          name: 'antd-lib',
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          priority: 20,
          chunks: 'initial'
        },
        antdDesign: {
          name: 'antd-lib',
          test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
          priority: 20,
          chunks: 'initial'
        }
      }
    }
  }
};