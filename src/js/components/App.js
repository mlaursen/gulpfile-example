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
            <li>
              <Link to="/persons/a" activeClassName="active">Person A</Link>
            </li>
            <li>
              <Link to="/persons/b" activeClassName="active">Person B</Link>
            </li>
            <li>
              <Link to="/persons/c" activeClassName="active">Person C</Link>
            </li>
            <li>
              <Link to="/persons/d" activeClassName="active">Person D</Link>
            </li>
            <li>
              <Link to="/persons/e" activeClassName="active">Person E</Link>
            </li>
            <li>
              <Link to="/persons/f" activeClassName="active">Person F</Link>
            </li>
          </ul>
        </nav>
        <main className="container">{this.props.children}</main>;
      </div>
    );
  }
}
