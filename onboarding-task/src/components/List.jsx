import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {
  static _changeItemWithId(array, id, changedProperties) {
    const index = array.map(i => i.id).indexOf(id);
    const newArray = array;
    newArray[index] = { ...newArray[index], ...changedProperties };
    return newArray;
  }

  static _guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this._onListItemSubmit = this._onListItemSubmit.bind(this);
    this._onListItemClick = this._onListItemClick.bind(this);
    this._onListItemAdd = this._onListItemAdd.bind(this);
    this._onAddListItemInputChange = this._onAddListItemInputChange.bind(this);
    this._onListItemDelete = this._onListItemDelete.bind(this);
    this._onListItemCancel = this._onListItemCancel.bind(this);
  }

  _createFunctionWithBindId(id, func) {
    return func.bind(this, id);
  }

  _onListItemAdd(event) {
    event.preventDefault();
    const newState = this.state;
    newState.items.push({ id: List._guid(), text: this.state.addListItemInput, formDisplayed: false });
    newState.addListItemInput = '';
    this.setState(newState);
  }

  _onAddListItemInputChange(event) {
    this.setState({ addListItemInput: event.target.value });
  }

  _onListItemClick(id) {
    const newItems = List._changeItemWithId(this.state.items, id, { formDisplayed: true });
    this.setState({ items: newItems });
  }

  _onListItemSubmit(id, txt) {
    const newItems = List._changeItemWithId(this.state.items, id, { text: txt, formDisplayed: false });
    this.setState({ items: newItems });
  }

  _onListItemDelete(id) {
    const newItems = this.state.items;
    const index = newItems.map(i => i.id).indexOf(id);
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  }

  _onListItemCancel(id) {
    const newItems = List._changeItemWithId(this.state.items, id, { formDisplayed: false });
    this.setState({ items: newItems });
  }

  render() {
    const listItems = this.state.items.map((item, index) =>
      <ListItem
        id={item.id}
        onFormSubmit={this._onListItemSubmit}
        text={item.text}
        formDisplayed={item.formDisplayed}
        onCancelClick={this._createFunctionWithBindId(item.id, this._onListItemCancel)}
        onDeleteClick={this._createFunctionWithBindId(item.id, this._onListItemDelete)}
        place={index + 1}
        key={item.id}
        onItemClick={this._createFunctionWithBindId(item.id, this._onListItemClick)}
      />
    );

    return (
      <ul className="list-group">
        {listItems}
        <li className="list-group-item">
          <form className="form-inline" onSubmit={this._onListItemAdd} >
            <input type="text" className="form-control" value={this.state.addListItemInput || ''} placeholder="Add item" onChange={this._onAddListItemInputChange} />
            <button type="submit" className="btn btn-default" > Add </button>
          </form>
        </li>
      </ul>
    );
  }
}

export default List;
