import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DropdownMenu from 'react-dd-menu';
import { FlatButton } from 'react-buttons';

export default class Person extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  close = () => {
    this.setState({ isOpen: false });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  static propTypes = {
    id: PropTypes.string,
  }

  render() {
    const menuProps = {
      isOpen: this.state.isOpen,
      close: this.close,
      toggle: <FlatButton onClick={this.toggle} ripple={true} active={this.state.isOpen} color="primary">Something!</FlatButton>,
    };

    return (
      <div className="person">
        <h3>Some person, {this.props.id}</h3>
        <DropdownMenu {...menuProps}>
          <li><a href="#">Boop</a></li>
        </DropdownMenu>
      </div>
    );
  }
}
