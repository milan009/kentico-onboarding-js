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
    this._editItem = this._editItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _addItem(value) {
    const newItem = {
      id: generateGuid(),
      value };
    const items = { ...this.state.items, [newItem.id]: newItem };
    this.setState({ items });
  }

  _editItem(changedItem) {
    const items = { ...this.state.items, [changedItem.id]: changedItem };
    this.setState({ items });
  }

  _deleteItem(deletedItemID) {
    const items = { ...this.state.items };
    delete items[deletedItemID];
    this.setState({ items });
  }

  render() {
    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {Object.keys(this.state.items).map((id, index) =>
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
