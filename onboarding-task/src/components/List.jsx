import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem.jsx';
import AddItem from './AddItem.jsx';

class List extends Component {
  static displayName = 'List';

  constructor() {
    super();
    this.state = { items: [] };
    this._addItem = this._addItem.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._itemUpdate = this._itemUpdate.bind(this);
  }

  _removeItem(guid) {
    const items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].guid === guid) {
        items.splice(i);
      }
    }
    this.setState(items);
  }

  _addItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState(items);
  }

  _itemUpdate(item) {
    const items = this.state.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].guid === item.guid) {
        items[i] = item;
      }
    }
    this.setState(items);
  }

  render() {
    const items = this.state.items;
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            {items.map(item => <ListItem item={item} key={item.guid} handleDelete={this._removeItem} handleItemUpdate={this._itemUpdate} />)}
            <AddItem addItem={this._addItem} />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
