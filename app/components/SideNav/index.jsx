var React   = require('react'),
    Router  = require('react-router'),
    mui     = require('material-ui'),
    LeftNav = mui.LeftNav;

require('./style');

module.exports = React.createClass({

  mixins: [Router.Navigation, Router.State],

  render: function() {
    var menuItems = [
      {route: '/', text: 'Home'},
      {route: '/about', text: 'About'}
    ]

    var header = <div className='header'>Sample Project</div>;

    return <LeftNav
      className='sideNav'
      ref='leftNav'
      header={header}
      menuItems={menuItems}
      docked={false}
      onChange={this._onLeftNavChange} />;
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _onLeftNavChange: function(e, key, payload) {
    this.transitionTo(payload.route);
  }
});
