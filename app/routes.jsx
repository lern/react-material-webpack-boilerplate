'use strict';

var React        = require('react'),
    Router       = require('react-router'),
    Route        = Router.Route,
    DefaultRoute = Router.DefaultRoute;

// polyfill
if(!Object.assign)
  Object.assign = React.__spread;

// export routes
module.exports = (
  <Route name='app' path='/' handler={require('./components/App')}>
    <Route name='about' handler={require('./components/About')} />
    <DefaultRoute handler={require('./components/Home')} />
  </Route>
);
