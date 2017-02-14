import React, { Component, PropTypes } from 'react';

class ListItem extends Component {

  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onListItemClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._startEditing = this._startEditing.bind(this);
  }

  _startEditing() {
    this.props.onListItemClick(this.props.item.id);
  }

  render() {
    return (
      <div onClick={this._startEditing}>{`${this.props.index + 1}. ${this.props.item.text}`}</div>
    );
  }
}

export default ListItem;
