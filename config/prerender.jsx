'use strict';

var React                = require('react'),
    Router               = require('react-router'),
    routes               = require('../app/routes'),
    html                 = require('../app/prerender.html'),
    injectTapEventPlugin = require('react-tap-event-plugin');

module.exports = function(path, scriptUrl, styleUrl, commonsUrl, callback) {
  // run the path thought react-router
  Router.run(routes, path, function(Application, state) {
    injectTapEventPlugin();

    // prerender the application
    var application = React.renderToString(<Application />);

    // format the full page
    callback(null, html
      .replace('STYLE_URL', styleUrl)
      .replace('SCRIPT_URL', scriptUrl)
      .replace('COMMONS_URL', commonsUrl)
      .replace('CONTENT', application));
  });
};
