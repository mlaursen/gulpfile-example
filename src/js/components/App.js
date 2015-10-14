import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { IndexLink, Link } from 'react-router';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li>
              <IndexLink to="/" activeClassName="active">Dashboard</IndexLink>
            </li>
            <li>
              <Link to="/persons" activeClassName="active">Persons</Link>
            </li>
          </ul>
        </nav>
        <main className="container">{this.props.children}</main>;
      </div>
    );
  }
}
