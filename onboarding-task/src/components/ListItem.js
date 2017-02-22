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
    this.state = {
      inputValue: this.props.item.value,
      isBeingEdited: false };

    this._labelClick = this._labelClick.bind(this);
    this._inputChange = this._inputChange.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._saveValue = this._saveValue.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _labelClick() {
    this.setState({ isBeingEdited: true });
  }

  _inputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  _cancelEdit() {
    this.setState({
      inputValue: this.props.item.value,
      isBeingEdited: false });
  }

  _saveValue() {
    this.props.onItemValueEdit(this.props.item.id, this.state.inputValue);
    this.setState({ isBeingEdited: false });
  }

  _deleteItem() {
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const value = this.state.inputValue;
    if (this.state.isBeingEdited) {
      return (
        <EditItem
          value={this.state.inputValue}
          index={this.props.index}
          onEdit={this._saveValue}
          onDelete={this._deleteItem}
          onCancel={this._cancelEdit}
          onChange={this._inputChange}
        />);
    }
    return (
      <div onClick={this._labelClick}>
        {this.props.index}.{value}
      </div>
    );
  }
}

export default ListItem;
