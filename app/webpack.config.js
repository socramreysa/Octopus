const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssnano = require('cssnano');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    camelCase: true,
  },
};

const commonConfig = {
  entry: {
    src: PATHS.src,
  },
  resolve: {
    alias: {
     'react': path.join(__dirname, 'node_modules', 'react'),
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Styles: path.resolve(__dirname, 'src/styles/'),
      Reducers: path.resolve(__dirname, 'src/redux/reducers/'),
      Actions: path.resolve(__dirname, 'src/redux/actions/'),
      Config: path.resolve(__dirname, 'config/'),
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Static: path.resolve(__dirname, 'src/static/'),
      Redux: path.resolve(__dirname, 'src/redux/')
    },
    extensions: ['.jsx', '.js', '.json', 'scss'],
  },
  output: {
    path: PATHS.dist,
    filename: '[name][hash:8].js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2015', 'react'],
          plugins: ['transform-object-rest-spread'],
        },
      },
    }, {
      test: /\.(jpg|png)$/,
      loaders: [
        'url-loader?limit=10000!?name=public/[hash].[ext]',
      ],
    }],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Octopus',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
      mobile: true,
      links: [
        "https://fonts.googleapis.com/css?family=Exo+2:100,200,300",
        "https://fonts.googleapis.com/css?family=Raleway:100,400",
        "https://fonts.googleapis.com/css?family=Josefin+Sans:100,300,400",
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
        "https://fonts.googleapis.com/css?family=Lato",
        "https://fonts.googleapis.com/css?family=Lato:100",
        "https://fonts.googleapis.com/css?family=Roboto:100",
      ]
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};

const productionConfig = () => {
  const rules = [{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: cssLoader,
    }),
  }, {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [cssLoader, 'stylus-loader'],
    }),
  }];
  const productionPlugins = [
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin(PATHS.dist),
    new BabiliPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
      },
      canPrint: false,
    }),
  ];
  commonConfig.module.rules.push(...rules);
  commonConfig.plugins.push(...productionPlugins);
  return Object.assign(
    {},
    commonConfig);
};

const developmentConfig = () => {
  const rules = [{
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ],
  }, {
    test: /\.scss$/,
    use: [
      'style-loader',
      cssLoader,
    ],
  }];
  commonConfig.module.rules.push(...rules);
  const config = {
    devServer: {
      historyApiFallback: true,
      quiet: true,
      disableHostCheck: true,
      host: process.env.HOST || '0.0.0.0', // Defaults to `localhost`
      port: process.env.DEV_PORT || 8080, // Defaults to 8080
    },
  };
  return Object.assign(
    {},
    commonConfig,
    config);
};


module.exports = (env) => {
  if (env === 'production') {
    return productionConfig();
  }
  return developmentConfig();
};
