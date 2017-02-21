import React, { Component } from 'react';

import ListItem from './ListItem';
import AddItem from './AddItem';
import { generateGUID } from '../utils/generateGUID';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = { itemsMap: {}, itemsToDisplay: [] };

    this._addItem = this._addItem.bind(this);
    this._editItem = this._editItem.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _addItem(value) {
    const newItem = { id: generateGUID(), value };
    const itemsMap = Object.assign({}, this.state.itemsMap, { [newItem.id]: newItem });
    const itemsToDisplay = [...this.state.itemsToDisplay, newItem.id];
    this.setState({ itemsMap, itemsToDisplay });
  }

  _editItem(changedItem) {
    const itemsMap = Object.assign({}, this.state.itemsMap, { [changedItem.id]: changedItem });
    this.setState({ itemsMap });
  }

  _deleteItem(deletedItemID) {
    const itemsMap = Object.assign({}, this.state.itemsMap);
    delete itemsMap[deletedItemID];
    const itemsToDisplay = this.state.itemsToDisplay.filter((id) => id !== deletedItemID);
    this.setState({ itemsMap, itemsToDisplay });
  }

  render() {
    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {this.state.itemsToDisplay.map((id, index) =>
            <li className="list-group-item" key={id}>
              <ListItem
                item={{ id, value: this.state.itemsMap[id].value }}
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
