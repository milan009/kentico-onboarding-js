import React, { Component } from 'react';
import ListItem from './ListItem';
import CreateListItem from './CreateListItem';
import guid from '../utils/guidHelper';
import Immutable from 'immutable';
import { ItemRecord } from '../models/ItemRecord';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: new Immutable.Map(),
      itemsOrder: Immutable.List(),
    };

    this._onListItemSubmit = this._onListItemSubmit.bind(this);
    this._onListItemAdd = this._onListItemAdd.bind(this);
    this._onListItemDelete = this._onListItemDelete.bind(this);
    this._switchFormDisplayedOnId = this._switchFormDisplayedOnId.bind(this);
  }

  _onListItemAdd(text) {
    const id = guid();
    const newItems = this.state.items.set(id, new ItemRecord({ id, text, formDisplayed: false }));
    const newItemsOrder = this.state.itemsOrder.push(id);
    this.setState({ items: newItems, itemsOrder: newItemsOrder });
  }

  _onListItemSubmit(id, text) {
    const newItems = this.state.items.set(id, new ItemRecord({ id, formDisplayed: false, text }));
    this.setState({ items: newItems });
  }

  _onListItemDelete(id) {
    const index = this.state.itemsOrder.indexOf(id);
    const newItems = this.state.items.delete(id);
    const newItemsOrder = this.state.itemsOrder.splice(index, 1);
    this.setState({ items: newItems, itemsOrder: newItemsOrder });
  }

  _switchFormDisplayedOnId(id) {
    const item = this.state.items.get(id);
    const newItems = this.state.items.set(id, { id, text: item.text, formDisplayed: !item.formDisplayed });
    this.setState({ items: newItems });
  }

  render() {
    const listItems = this.state.itemsOrder.map((key, index) =>
      <ListItem
        key={key}
        index={index + 1}
        item={this.state.items.get(key)}
        switchFormDisplayed={this._switchFormDisplayedOnId}
        onDeleteClick={this._onListItemDelete}
        onFormSubmit={this._onListItemSubmit}
      />
    );

    return (
      <ul className="list-group">
        {listItems}
        <CreateListItem onListItemAdd={this._onListItemAdd} />
      </ul>
    );
  }
}

export default List;
