import React, { Component, PropTypes } from 'react';

class ListItemStatic extends Component {
  static displayName = 'ListItemStatic';
  static propTypes = {
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
    return (
      <tr>
        <td>
          <div onClick={this._handleClick}>{this.props.index + 1}. {this.props.item.text}</div>
        </td>
      </tr>
    );
  }
}

export default ListItemStatic;
