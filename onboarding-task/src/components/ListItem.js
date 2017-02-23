import React, { Component, PropTypes } from 'react';

import EditItem from './EditItem';

class ListItem extends Component {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onItemValueEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired };

  constructor(props) {
    super(props);
    this.state = { isBeingEdited: false };

    this._labelClick = this._labelClick.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._saveValue = this._saveValue.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _labelClick() {
    this.setState({ isBeingEdited: true });
  }

  _cancelEdit() {
    this.setState({ isBeingEdited: false });
  }

  _saveValue(value) {
    this.props.onItemValueEdit(this.props.item.id, value);
    this.setState({ isBeingEdited: false });
  }

  _deleteItem() {
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const value = this.props.item.value;
    if (this.state.isBeingEdited) {
      return (
        <EditItem
          value={value}
          index={this.props.index}
          onEdit={this._saveValue}
          onDelete={this._deleteItem}
          onCancel={this._cancelEdit}
        />);
    }
    return (
      <div onClick={this._labelClick}>
        {this.props.index}. {value}
      </div>
    );
  }
}

export default ListItem;
