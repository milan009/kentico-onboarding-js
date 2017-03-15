import React, { Component, PropTypes } from 'react';

class ListItemStatic extends Component {
  static displayName = 'ListItemStatic';
  static propTypes = {
    item: React.PropTypes.shape({
      guid: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }),
    index: PropTypes.number.isRequired,
    onToggleEditMode: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.onToggleEditMode(this.props.item.guid);
  }

  render() {
    return (
      <tr>
        <td>
          <div onClick={this._onClick}>{this.props.index}. {this.props.item.text}</div>
        </td>
      </tr>
    );
  }
}

export { ListItemStatic };
