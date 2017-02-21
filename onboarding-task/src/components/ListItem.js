import React, { Component, PropTypes } from 'react';

import ListItemForm from './ListItemForm';

class ListItem extends Component {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired };

  constructor(props) {
    super(props);
    this.state = {
      tempValue: this.props.item.value,
      isEditable: false };

    this._labelClick = this._labelClick.bind(this);
    this._inputChange = this._inputChange.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._saveValue = this._saveValue.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _labelClick() {
    this.setState({ isEditable: true });
  }

  _inputChange(event) {
    this.setState({ tempValue: event.target.value });
  }

  _cancelEdit() {
    this.setState({
      tempValue: this.props.item.value,
      isEditable: false });
  }

  _saveValue() {
    this.props.onEdit({
      id: this.props.item.id,
      value: this.state.tempValue });
    this.setState({ isEditable: false });
  }

  _deleteItem() {
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const value = this.state.tempValue;
    if (this.state.isEditable) {
      return (
        <ListItemForm
          value={this.state.tempValue}
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
