import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <h1>Hello from the Dashboard</h1>
    );
  }
}
