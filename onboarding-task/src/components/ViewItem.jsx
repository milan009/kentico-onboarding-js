import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewItem extends Component {

  static propTypes = {
    element: PropTypes.object,
  };

  render() {
    return <span>{this.props.element.text}</span>;
  }
}

export { ViewItem };
