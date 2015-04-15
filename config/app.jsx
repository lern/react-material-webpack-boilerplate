'use strict';

var React                = require('react'),
    Router               = require('react-router'),
    routes               = require('../app/routes'),
    injectTapEventPlugin = require('react-tap-event-plugin');

// react-router handles location
Router.run(routes, Router.HistoryLocation, function(Application, state) {

  injectTapEventPlugin();

  // Render the components
  React.render(<Application />, document.getElementById('content'));
});
