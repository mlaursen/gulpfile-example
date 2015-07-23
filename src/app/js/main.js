window.React = require('react');

var boop = require('react-keymirror')({
  HELLO: null
});

var Application = require('./Application.react');

React.render(<Application />, document.getElementById('app'));
