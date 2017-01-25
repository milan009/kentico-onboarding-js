import React, { Component, PropTypes } from 'react';

class ListItemStatic extends Component {
  static displayName = 'ListItemStatic';
  static propTypes = {
    key: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.props.handleClick(this.props.item);
  }

  render() {
    return <div onClick={this._handleClick}>{this.props.index + 1}. {this.props.item.text}</div>;
  }
}

export default ListItemStatic;
