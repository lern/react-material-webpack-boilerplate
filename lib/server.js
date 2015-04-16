'use strict';
/*eslint handle-callback-err: 0*/

module.exports = function(options) {

  var express = require('express');
  var bodyParser = require('body-parser');
  var path = require('path');
  require('uuid');

  // require the page rendering logic
  var renderApplication = options.prerender ?
    require('../build/prerender/main.js') :
    require('../config/simple.js');

  // load bundle information from stats
  var stats = require('../build/stats.json');

  var publicPath = stats.publicPath;

  var STYLE_URL = options.separateStylesheet && (publicPath + 'main.css?' + stats.hash);
  var SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];
  var COMMONS_URL = publicPath + [].concat(stats.assetsByChunkName.commons)[0];

  var app = express();

  // serve the static assets
  app.use('/_assets', express.static(path.join(__dirname, '..', 'build', 'public'), {
    maxAge: '200d' // We can cache them as they include hashes
  }));
  app.use('/', express.static(path.join(__dirname, '..', 'public'), {
  }));

  app.use(bodyParser.json());

  // application
  app.get('/*', function(req, res) {
    renderApplication(req.path, SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
      res.contentType = 'text/html; charset=utf8';
      res.end(html);
    });
  });


  var port = +(process.env.PORT || options.defaultPort || 8080);
  app.listen(port, function() {
    console.log('Server listening on port ' + port);
  });
};
