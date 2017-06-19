import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewItem extends Component {

  static displayName = 'ViewItem';

  static propTypes = {
    index: PropTypes.number,
    element: PropTypes.object,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <div onClick={this.props.onClick}>
        <span>{this.props.index}. </span>
        {this.props.element.text}
      </div>);
  }
}

export { ViewItem };
