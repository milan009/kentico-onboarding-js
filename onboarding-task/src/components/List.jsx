import React, { Component } from 'react';

import ListItem from './ListItem';
import AddItemElement from './AddItemElement';
import { generateGUID } from '../utils/generateGUID';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = { listItems: [] };

    this._handleAdd = this._handleAdd.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
  }

  _handleAdd(value) {
    const updatedListItems = this.state.listItems.concat([{ id: generateGUID(), value }]);
    this.setState({ listItems: updatedListItems });
  }

  _handleEdit(changedItem) {
    const updatedListItems = this.state.listItems.map((item) => ((item.id === changedItem.id) && changedItem) || item);
    this.setState({ listItems: updatedListItems });
  }

  _handleDelete(deletedItemID) {
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
                onEdit={this._handleEdit}
                onDelete={this._handleDelete}
              />
            </li>
          )}
          <li className="list-group-item">
            <AddItemElement onAdd={this._handleAdd} />
          </li>
        </ul>
      </div>
    );
  }
}

export default List;
