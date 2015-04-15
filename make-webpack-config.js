var path               = require('path'),
    webpack            = require('webpack'),
    ExtractTextPlugin  = require('extract-text-webpack-plugin'),
    loadersByExtension = require('./config/loadersByExtension'),
    joinEntry          = require('./config/joinEntry'),
    fs                 = require('fs');

module.exports = function(options) {
  var entry = {
    main: reactEntry('main'),
    // second: reactEntry('second')
  };
  var loaders = {
    'coffee': 'coffee-redux-loader',
    'jsx': options.hotComponents ? ['react-hot-loader', 'babel-loader'] : 'babel-loader',
    'json': 'json-loader',
    'js': {
      loader: 'babel-loader',
      include: path.join(__dirname, 'app')
    },
    'json5': 'json5-loader',
    'txt': 'raw-loader',
    'png|jpg|jpeg|gif|svg': 'url-loader?limit=10000',
    'woff|woff2': 'url-loader?limit=100000',
    'ttf|eot': 'file-loader',
    'wav|mp3': 'file-loader',
    'html': 'html-loader',
    'md|markdown': ['html-loader', 'markdown-loader']
  };
  var stylesheetLoaders = {
    'css': 'css-loader!autoprefixer-loader',
    'less': 'css-loader!autoprefixer-loader!less-loader',
    'styl': 'css-loader!autoprefixer-loader!stylus-loader',
    'scss': 'css-loader!autoprefixer-loader!sass',
    'sass': 'css-loader!autoprefixer-loader!sass?indentedSyntax=sass'
  };
  var additionalLoaders = [
    // { test: /some-reg-exp$/, loader: 'any-loader' }
  ];
  var alias = {

  };
  var aliasLoader = {

  };
  var externals = [

  ];
  var modulesDirectories = ['web_modules', 'node_modules'];
  var extensions = ['', '.web.js', '.js', '.jsx', '.sass', '.css'];
  var fallbacks = ['node_modules/material-ui-sass/material-ui/material-design-fonticons'];
  var root = path.join(__dirname, 'app');
  var publicPath = options.devServer ?
    'http://localhost:2992/_assets/' :
    '/_assets/';
  var output = {
    path: path.join(__dirname, 'build', options.prerender ? 'prerender' : 'public'),
    publicPath: publicPath,
    filename: '[name].js' + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : ''),
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : ''),
    sourceMapFilename: 'debugging/[file].map',
    libraryTarget: options.prerender ? 'commonjs2' : undefined,
    pathinfo: options.debug
  };
  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/
  ];
  var plugins = [
    function() {
      if(!options.prerender) {
        this.plugin('done', function(stats) {
          var jsonStats = stats.toJson({
            chunkModules: true,
            exclude: excludeFromStats
          });
          jsonStats.publicPath = publicPath;

          var dir = path.join(__dirname, 'build');
          if (!fs.existsSync(dir)) fs.mkdirSync(dir);
          fs.writeFileSync(path.join(__dirname, 'build', 'stats.json'), JSON.stringify(jsonStats));
        });
      }
    },
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
  ];
  if(options.prerender) {
    aliasLoader['react-proxy$'] = 'react-proxy/unavailable';
    externals.push(
      /^react(\/.*)?$/,
      /^reflux(\/.*)?$/,
      'superagent',
      'async'
    );
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  }
  if(options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js' + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : '')));
  }


  function reactEntry(name) {
    return (options.prerender ? './config/prerender?' : './config/app?') + name;
  }
  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var loaders = stylesheetLoaders[ext];
    if(Array.isArray(loaders)) loaders = loaders.join('!');
    if(options.prerender) {
      stylesheetLoaders[ext] = 'null-loader';
    } else if(options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract('style-loader', loaders);
    } else {
      stylesheetLoaders[ext] = 'style-loader!' + loaders;
    }
  });
  if(options.separateStylesheet && !options.prerender) {
    plugins.push(new ExtractTextPlugin('[name].css' + (options.longTermCaching ? '?[contenthash]' : '')));
  }
  if(options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }

  return {
    entry: entry,
    output: output,
    target: options.prerender ? 'node' : 'web',
    module: {
      loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders))
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
      alias: aliasLoader
    },
    externals: externals,
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      fallback: fallbacks,
      alias: alias
    },
    plugins: plugins,
    devServer: {
      stats: {
        exclude: excludeFromStats
      }
    }
  };
};
