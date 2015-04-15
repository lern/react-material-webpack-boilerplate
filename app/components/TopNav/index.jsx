var React      = require('react'),
    mui        = require('material-ui'),
    Paper      = mui.Paper,
    IconButton = mui.IconButton,
    FontIcon   = mui.FontIcon,
    navIcons   = require('../../../node_modules/material-design-icons/sprites/css-sprite/sprite-navigation-white.css');

require('./style');

module.exports = React.createClass({
  render: function() {
    var menuButton = <IconButton onClick={this.props.onMenuIconButtonTouch}>
      <FontIcon className='menu-icon icon-navigation-white icon-navigation-white-ic_menu_white_24dp' />
    </IconButton>

    return <Paper className='topNav' rounded={false}>
      <mui.AppBar
        iconElementLeft={menuButton}
        title='Sample project'
        zDepth={0} />
    </Paper>;
  }
});
