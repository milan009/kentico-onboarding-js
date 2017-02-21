import React, { Component } from 'react';

import ListItem from './ListItem';
import AddItem from './AddItem';
import { generateGuid } from '../utils/generateGuid';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      itemsToDisplay: [] };

    this._addItem = this._addItem.bind(this);
    this._editItem = this._editItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _addItem(value) {
    const newItem = {
      id: generateGuid(),
      value };
    const items = { ...this.state.items, [newItem.id]: newItem };
    const itemsToDisplay = [...this.state.itemsToDisplay, newItem.id];
    this.setState({
      items,
      itemsToDisplay });
  }

  _editItem(changedItem) {
    const items = { ...this.state.items, [changedItem.id]: changedItem };
    this.setState({ items });
  }

  _deleteItem(deletedItemID) {
    const items = { ...this.state.items };
    delete items[deletedItemID];
    const itemsToDisplay = this.state.itemsToDisplay.filter(id => id !== deletedItemID);
    this.setState({
      items,
      itemsToDisplay });
  }

  render() {
    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {this.state.itemsToDisplay.map((id, index) =>
            <li className="list-group-item" key={id}>
              <ListItem
                item={{
                  id,
                  value: this.state.items[id].value }}
                index={index + 1}
                onEdit={this._editItem}
                onDelete={this._deleteItem}
              />
            </li>
          )}
          <li className="list-group-item">
            <AddItem onAdd={this._addItem} />
          </li>
        </ul>
      </div>
    );
  }
}

export default List;
