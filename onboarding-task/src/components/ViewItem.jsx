import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewItem extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  };

  render() {
    return <span>{this.props.text}</span>;
  }
}

export { ViewItem };
