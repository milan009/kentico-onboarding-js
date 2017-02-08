import React, { Component } from 'react';
import ListItem from './ListItem';
import CreateListItem from './CreateListItem';
import newGuid from '../utils/guidHelper';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: new Map(),
    };

    this._onListItemSubmit = this._onListItemSubmit.bind(this);
    this._onListItemClick = this._onListItemClick.bind(this);
    this._onListItemAdd = this._onListItemAdd.bind(this);
    this._onListItemDelete = this._onListItemDelete.bind(this);
    this._onListItemCancel = this._onListItemCancel.bind(this);
  }

  _createFunctionWithBoundId(id, func) {
    return func.bind(this, id);
  }

  _onListItemAdd(text) {
    const newState = this.state;
    newState.items.set(newGuid(), { text, formDisplayed: false, timeStamp: Date.now() });
    this.setState(newState);
  }

  _onListItemClick(id) {
    const newItems = this.state.items;
    newItems.set(id, { ...newItems.get(id), formDisplayed: true });
    this.setState({ items: newItems });
  }

  _onListItemSubmit(id, text) {
    const newItems = this.state.items;
    newItems.set(id, { ...newItems.get(id), formDisplayed: false, text });
    this.setState({ items: newItems });
  }

  _onListItemDelete(id) {
    const newItems = this.state.items;
    newItems.delete(id);
    this.setState({ items: newItems });
  }

  _onListItemCancel(id) {
    const newItems = this.state.items;
    newItems.set(id, { ...newItems.get(id), formDisplayed: false });
    this.setState({ items: newItems });
  }

  render() {
    const listItems = Array.from(this.state.items.keys()).map((key, index) =>
      <ListItem
        id={key}
        onFormSubmit={this._onListItemSubmit}
        text={this.state.items.get(key).text}
        formDisplayed={this.state.items.get(key).formDisplayed}
        onCancelClick={this._createFunctionWithBoundId(key, this._onListItemCancel)}
        onDeleteClick={this._createFunctionWithBoundId(key, this._onListItemDelete)}
        place={index + 1}
        key={key}
        onItemClick={this._createFunctionWithBoundId(key, this._onListItemClick)}
      />,
      (key1, key2) => {
        return listItems.get(key1).timeStamp - listItems.get(key2).timeStamp;
      }
    );

    return (
      <ul className="list-group">
        {listItems}
        <CreateListItem _onListItemAdd={this._onListItemAdd} />
      </ul>
    );
  }
}

export default List;
