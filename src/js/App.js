var DropdownMenu = require('react-dd-menu');
var DropdownMenuItem = DropdownMenu.DropdownMenuItem;

var Application = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false,
      isOpen2: false
    };
  },

  close: function() { this.setState({ isOpen: false }); },
  toggle: function() { this.setState({ isOpen: !this.state.isOpen }); },
  close2: function() { this.setState({ isOpen2: false }); },
  toggle2: function() { this.setState({ isOpen2: !this.state.isOpen2 }); },
  click: function(e) {
    console.log('You clicked something!');
  },
  
  
  render: function() {
    return (
      <div className="container">
        <h1>Hello, world!</h1>
        <p className="lorem-ipsum">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget egestas ante. Suspendisse suscipit purus placerat,
          accumsan massa sed, lobortis purus. Vestibulum ut purus ac nibh bibendum egestas non eget purus. Duis suscipit dictum est,
          sed lobortis velit imperdiet quis. Proin rhoncus leo condimentum maximus cursus. Curabitur eu dui semper, aliquam quam eu,
          convallis turpis. Nunc quis eleifend felis. Pellentesque malesuada mi blandit ante eleifend, in pretium risus dignissim.
          Donec sit amet blandit eros. Sed aliquet ex vel arcu pulvinar pretium nec eget est. Ut eu magna luctus, rhoncus leo ac,
          luctus odio. Donec odio quam, laoreet id facilisis sed, porttitor ac velit. Maecenas et dictum massa. Nulla et porttitor massa.
        </p>
        <p className="lorem-ipsum">
          Fusce at egestas ex, id fermentum mauris. Nunc lacinia elit vitae sem placerat, vitae iaculis mauris lacinia. Etiam magna nisl,
          dignissim ac elementum vel, convallis ac dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Mauris aliquam sagittis ante nec semper. Fusce placerat aliquam elit pulvinar ultrices. Nulla luctus id quam et
          semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer quis est suscipit metus aliquet hendrerit. 
        </p>
        <DropdownMenu toggle={<button type="button" onClick={this.toggle}>Click me!</button>} close={this.close} isOpen={this.state.isOpen}>
          <DropdownMenuItem action={this.click}>Example 1</DropdownMenuItem>
        </DropdownMenu>
        <DropdownMenu toggle={<button type="button" onClick={this.toggle2}>Click me!</button>} close={this.close2} isOpen={this.state.isOpen2}
            className="dd-menu-inverse">
          <li><a href="#">Example 1</a></li>
          <li><a href="#">Example 2</a></li>
          <li><button type="button" onClick={this.click}>Example 3</button></li>
        </DropdownMenu>
      </div>
    );
  }
});

module.exports = Application;
