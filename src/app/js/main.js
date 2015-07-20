window.React = require('react');

var boop = require('react-keymirror')({
  HELLO: null
});

React.render(<h1>Hello, world!</h1>, document.getElementById('app'));
