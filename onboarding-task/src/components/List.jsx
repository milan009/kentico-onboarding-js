import React, { Component } from 'react';

class List extends Component {
  static _changeItemWithId(item, id, changedProperties) {
    if (item.id.toString() === id) {
      return { ...item, ...changedProperties };
    }
    return item;
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: 1,
        text: 'test',
        formDisplayed: false,
      }],
    };

    this._onListItemSubmit = this._onListItemSubmit.bind(this);
    this._onListItemClick = this._onListItemClick.bind(this);
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
      </div>
    );
  }
}

export default List;
