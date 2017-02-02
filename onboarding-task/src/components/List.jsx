import React, { Component } from 'react';

class List extends Component {
  static _changeItemWithId(item, id, changedProperties) {
    if (item.id.toString() === id) {
      return { ...item, ...changedProperties };
    }
    return item;
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
      items: [{
        id: List._guid(),
        text: 'test',
        formDisplayed: false,
      }],
    };

    this._onListItemSubmit = this._onListItemSubmit.bind(this);
    this._onListItemClick = this._onListItemClick.bind(this);
    this._onListItemAdd = this._onListItemAdd.bind(this);
    this._onAddListItemInputChange = this._onAddListItemInputChange.bind(this);
  }

  _onListItemClick(event) {
    const newItems = this.state.items.map(item => List._changeItemWithId(item, event.target.id, { formDisplayed: true }));
    this.setState({ items: newItems });
  }

  _onListItemSubmit(event) {
    event.preventDefault();
    const newItems = this.state.items.map(item => List._changeItemWithId(item, event.target.id, { text: event.target.value }));
    this.setState({ items: newItems });
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

  render() {
    const listItems = this.state.items.map(item =>
      <div id={item.id} onClick={this._onListItemClick} onSubmit={this._onListItemSubmit} key={item.id}>
        id: {item.id} <br />
        text: {item.text} <br />
        formDisplayed: {item.formDisplayed ? 'true' : 'false'} <br />
      </div>
    );

    return (
      <div className="table">
        {listItems}
        <div>
          <form className="form-inline" onSubmit={this._onListItemAdd} >
            <input type="text" className="form-control" value={this.state.addListItemInput || ''} placeholder="Add item" onChange={this._onAddListItemInputChange} />
            <button type="submit" className="btn btn-default" > Add </button>
          </form>
        </div>
      </div>
    );
  }
}

export default List;
