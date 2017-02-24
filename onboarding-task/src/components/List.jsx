import React, { Component } from 'react';

import ListItem from './ListItem';
import AddItem from './AddItem';
import { generateGuid } from '../utils/generateGuid';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = { items: {} };

    this._addItem = this._addItem.bind(this);
    this._editItemValue = this._editItemValue.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _addItem(value) {
    const newItem = {
      id: generateGuid(),
      value };
    const items = {
      ...this.state.items,
      [newItem.id]: newItem };
    this.setState({ items });
  }

  _editItemValue(id, value) {
    const editedItem = {
      id,
      value };
    const items = {
      ...this.state.items,
      [id]: editedItem };
    this.setState({ items });
  }

  _deleteItem(deletedItemID) {
    const items = { ...this.state.items };
    delete items[deletedItemID];
    this.setState({ items });
  }

  _renderListItems() {
    return Object.keys(this.state.items).map((id, index) =>
      <li className="list-group-item" key={id}>
        <ListItem
          item={this.state.items[id]}
          index={index + 1}
          onItemValueEdit={this._editItemValue}
          onDelete={this._deleteItem}
        />
      </li>
    );
  }

  render() {
    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {this._renderListItems()}
          <li className="list-group-item">
            <AddItem onAdd={this._addItem} />
          </li>
        </ul>
      </div>
    );
  }
}

export default List;
