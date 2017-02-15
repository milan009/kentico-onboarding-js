import React, { Component } from 'react';
import Immutable from 'immutable';

import { ItemRecord } from '../models/ItemRecord';
import ListItem from './ListItem';
import CreateListItem from './CreateListItem';
import guid from '../utils/guidHelper';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: new Immutable.Map(),
      itemsOrder: Immutable.List(),
    };

    this._updateListItemText = this._updateListItemText.bind(this);
    this._addListItem = this._addListItem.bind(this);
    this._deleteListItem = this._deleteListItem.bind(this);
    this._switchListItemFormDisplayed = this._switchListItemFormDisplayed.bind(this);
  }

  _addListItem(text) {
    const id = guid();
    const newItem = new ItemRecord({ id, text, formDisplayed: false });
    const newItems = this.state.items.set(id, newItem);
    const newItemsOrder = this.state.itemsOrder.push(id);
    this.setState({ items: newItems, itemsOrder: newItemsOrder });
  }

  _updateListItemText(id, text) {
    const item = this.state.items.get(id);
    const updatedItem = item.merge({ formDisplayed: false, text });
    const newItems = this.state.items.set(id, updatedItem);
    this.setState({ items: newItems });
  }

  _deleteListItem(id) {
    const index = this.state.itemsOrder.indexOf(id);
    const newItems = this.state.items.delete(id);
    const newItemsOrder = this.state.itemsOrder.splice(index, 1);
    this.setState({ items: newItems, itemsOrder: newItemsOrder });
  }

  _switchListItemFormDisplayed(id) {
    const item = this.state.items.get(id);
    const updatedItem = item.merge({ formDisplayed: !item.formDisplayed });
    const newItems = this.state.items.set(id, updatedItem);
    this.setState({ items: newItems });
  }

  render() {
    const listItems = this.state.itemsOrder.map((key, index) =>
      <ListItem
        key={key}
        index={index + 1}
        item={this.state.items.get(key)}
        onFormDisplayedSwitch={this._switchListItemFormDisplayed}
        onDeleteClick={this._deleteListItem}
        onFormSubmit={this._updateListItemText}
      />
    );

    return (
      <ul className="list-group">
        {listItems}
        <CreateListItem onListItemAdd={this._addListItem} />
      </ul>
    );
  }
}

export default List;
