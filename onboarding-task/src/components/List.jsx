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
    this._onListItemAdd = this._onListItemAdd.bind(this);
    this._onListItemDelete = this._onListItemDelete.bind(this);
    this._switchFormDisplayedOnId = this._switchFormDisplayedOnId.bind(this);
  }

  _createFunctionWithBoundId(id, func) {
    return func.bind(this, id);
  }

  _onListItemAdd(text) {
    const newState = this.state;
    newState.items.set(newGuid(), { text, formDisplayed: false, timeStamp: Date.now() });
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
    this.setState({ items: newItems });
  }

  _switchFormDisplayedOnId(id) {
    const newItems = this.state.items;
    newItems.set(id, { ...newItems.get(id), formDisplayed: !newItems.get(id).formDisplayed });
    this.setState({ items: newItems });
  }

  render() {
    const listItems = Array.from(this.state.items.keys()).map((key, index) =>
      <ListItem
        id={key}
        onFormSubmit={this._onListItemSubmit}
        text={this.state.items.get(key).text}
        formDisplayed={this.state.items.get(key).formDisplayed}
        switchFormDisplayed={this._createFunctionWithBoundId(key, this._switchFormDisplayedOnId)}
        onDeleteClick={this._createFunctionWithBoundId(key, this._onListItemDelete)}
        place={index + 1}
        key={key}
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
