import React, { Component } from 'react';

import ListItem from './ListItem';
import AddItemElement from './AddItemElement';
import { generateGUID } from '../utils/generateGUID';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = { listItems: [] };

    this._addItem = this._addItem.bind(this);
    this._editItem = this._editItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _addItem(value) {
    const updatedListItems = this.state.listItems.concat([{ id: generateGUID(), value }]);
    this.setState({ listItems: updatedListItems });
  }

  _editItem(changedItem) {
    const updatedListItems = this.state.listItems.map((item) => ((item.id === changedItem.id) && changedItem) || item);
    this.setState({ listItems: updatedListItems });
  }

  _deleteItem(deletedItemID) {
    const updatedListItems = this.state.listItems.filter((item) => item.id !== deletedItemID);
    this.setState({ listItems: updatedListItems });
  }

  render() {
    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {this.state.listItems.map((item, index) =>
            <li className="list-group-item">
              <ListItem
                key={item.id}
                id={item.id}
                value={item.value}
                index={index + 1}
                onEdit={this._editItem}
                onDelete={this._deleteItem}
              />
            </li>
          )}
          <li className="list-group-item">
            <AddItemElement onAdd={this._addItem} />
          </li>
        </ul>
      </div>
    );
  }
}

export default List;
