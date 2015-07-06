'use strict';

var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    mui          = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    TopNav       = require('../TopNav'),
    SideNav      = require('../SideNav');

require('./style');

var Application = React.createClass({
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

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

Application.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Application;
