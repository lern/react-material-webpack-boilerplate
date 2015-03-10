var React        = require('react'),
    mui          = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    Snackbar     = mui.Snackbar;

module.exports = React.createClass({
  render: function() {
    return <div className='homePage pageContent'>
      <section className='heroSection'>
        <h1>Homepage</h1>
        <p>This is a sample project that uses React, Webpack and Material UI. It supports lightning-fast development ala live reload.</p>
        <RaisedButton label='Try Me!' primary={true} onTouchTap={this._handleClick} />
        <Snackbar
          ref='snackbar'
          message={'You did it!'} />
      </section>
    </div>;
  },

  _handleClick: function() {
    this.refs.snackbar.show();
  }
});
