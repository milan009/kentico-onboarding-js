import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewItem extends Component {

  static displayName = 'ViewItem';

  static propTypes = {
    index: PropTypes.number,
    element: PropTypes.object,
    onClick: PropTypes.func,
  };

  _handleClick = () => {
    this.props.onClick(this.props.element.id);
  };

  render() {
    return (
      <div onClick={this._handleClick}>
        <span>{this.props.index}. </span>
        {this.props.element.text}
      </div>);
  }
}

export { ViewItem };
