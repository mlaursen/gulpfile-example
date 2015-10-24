import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Person from './Person';

export default class PersonList extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string),
    params: PropTypes.object,
    children: PropTypes.node,
  }

  static defaultProps = {
    ids: ['a', 'b', 'c', 'd', 'e', 'f'],
  }

  render() {
    return (
      <div className="person-list">
        <h2>Hello from PersonList</h2>
        <ul className="list-unstyled">
          {this.props.ids.map(id => {
            return (
              <li key={id}>
                <Person id={id}>
                  {id === this.props.params.id && this.props.children}
                </Person>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
