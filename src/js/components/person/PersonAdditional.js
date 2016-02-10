import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class PersonAdditional extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <h6>This is a person with a param id of {this.props.params.id}</h6>
        <div style={{ width: '100%', height: '20px', background: '#fdfdfd' }} />
      </div>
    );
  }
}
