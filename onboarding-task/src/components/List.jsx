import React, { Component } from 'react';
import * as Immutable from 'immutable';
import ExistingItem from './ExistingItem';
import NewItem from './NewItem';
import Item from '../models/Item';

const getStaticItems = () => [
  new Item('Make a coffee'),
  new Item('Make a coffee great again'),
  new Item('We want you, coffee!'),
  new Item('Coffee can do it \uD83D\uDCAA'),
];

const getStaticItemsDictionary = () => getStaticItems()
  .map(item => [item.id, item]);

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: Immutable.OrderedMap(
        getStaticItemsDictionary()),
    };

    this._renderItem = this._renderItem.bind(this);
    this._addNewItem = this._addNewItem.bind(this);
    this._updateExistingItem = this._updateExistingItem.bind(this);
    this._deleteExistingItem = this._deleteExistingItem.bind(this);
  }

  _addNewItem(description) {
    const newItem = new Item(description);
    const newItems = this.state.items.set(newItem.id, newItem);

    this.setState({ items: newItems });
  }

  _deleteExistingItem(id) {
    const newItems = this.state.items.delete(id);

    this.setState({ items: newItems });
  }

  _updateExistingItem(item) {
    const newItems = this.state.items.set(item.id, item);

    this.setState({ items: newItems });
  }

  _renderItem(item, index) {
    return (
      <li
        key={item.id}
        className="list-group-item"
      >
        <ExistingItem
          index={index + 1}
          item={item}
          onItemUpdate={this._updateExistingItem}
          onItemDelete={this._deleteExistingItem}
        />
      </li>);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this
                .state
                .items
                .valueSeq()
                .map(this._renderItem)}
            <li className="list-group-item">
              <NewItem onSubmit={this._addNewItem} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default List;
