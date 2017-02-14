import React, { Component } from 'react';
import ListItem from './ListItem';
import CreateListItem from './CreateListItem';
import guid from '../utils/guidHelper';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: new Map(),
      itemsOrder: [],
    };

    this._onListItemSubmit = this._onListItemSubmit.bind(this);
    this._onListItemAdd = this._onListItemAdd.bind(this);
    this._onListItemDelete = this._onListItemDelete.bind(this);
    this._switchFormDisplayedOnId = this._switchFormDisplayedOnId.bind(this);
  }

  _createFunctionWithBoundId(id, func) {
    return func.bind(this, id);
  }

  _onListItemAdd(text) {
    const newState = this.state;
    const id = guid();
    newState.items.set(id, { text, formDisplayed: false });
    newState.itemsOrder.push(id);
    this.setState(newState);
  }

  _onListItemSubmit(id, text) {
    const newItems = this.state.items;
    newItems.set(id, { ...newItems.get(id), formDisplayed: false, text });
    this.setState({ items: newItems });
  }

  _onListItemDelete(id) {
    const newItems = this.state.items;
    newItems.delete(id);
    const index = this.state.itemsOrder.indexOf(id);
    const newItemsOrder = this.state.itemsOrder;
    newItemsOrder.splice(index, 1);
    this.setState({ items: newItems, itemsOrder: newItemsOrder });
  }

  _switchFormDisplayedOnId(id) {
    const newItems = this.state.items;
    const item = this.state.items.get(id);
    newItems.set(id, { ...item, formDisplayed: !item.formDisplayed });
    this.setState({ items: newItems });
  }

  render() {
    const listItems = this.state.itemsOrder.map((key, index) =>
      <ListItem
        key={key}
        index={index + 1}
        item={this.state.items.get(key)}
        switchFormDisplayed={this._createFunctionWithBoundId(key, this._switchFormDisplayedOnId)}
        onDeleteClick={this._createFunctionWithBoundId(key, this._onListItemDelete)}
        onFormSubmit={this._createFunctionWithBoundId(key, this._onListItemSubmit)}
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
