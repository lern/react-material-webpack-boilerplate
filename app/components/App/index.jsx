var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler
    TopNav       = require('../TopNav'),
    SideNav      = require('../SideNav');

require('./style');

var Application = React.createClass({
  render: function() {
    return <div className={'application'}>
      <TopNav onMenuIconButtonTouch={this._onMenuIconButtonTouch}/>
      <SideNav ref='sideNav' />
      <RouteHandler />
    </div>;
  },

  _onMenuIconButtonTouch: function() {
    this.refs.sideNav.toggle();
  }
});

module.exports = Application;
