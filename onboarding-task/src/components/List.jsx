import React, { Component } from 'react';
import * as Immutable from "immutable";
import ExistingItem from './ExistingItem';
import NewItem from './NewItem';
import Item from '../models/Item';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: Immutable
        .Map([
            new Item('Make a coffee'),
            new Item('Make a coffee great again'),
            new Item('We want you, coffee!'),
            new Item('Coffee can do it \uD83D\uDCAA'),
          ]
            .map(item => [item.id, item])
        )
    };

    this._renderItem = this._renderItem.bind(this);
    this._newItemAdded = this._newItemAdded.bind(this);
    this._existingItemUpdated = this._existingItemUpdated.bind(this);
    this._existingItemDeleted = this._existingItemDeleted.bind(this);
  }

  _newItemAdded(description) {
    const newItem = new Item(description);
    const newItems = this.state.items.set(newItem.id, newItem);

    this.setState({ items: newItems });
  }

  _existingItemDeleted(id) {
    const newItems = this.state.items.delete(id);

    this.setState({ items: newItems });
  }

  _existingItemUpdated(item) {
    const newItems = this.state.items.set(item.id, item);

    this.setState({ items: newItems });
  }

  _renderItem(item, index) {
    return <ExistingItem
      key={item.id}
      index={index + 1}
      item={item}
      onItemDeleted={this._existingItemDeleted}
      onItemUpdated={this._existingItemUpdated}
    />
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            { this
                .state
                .items
                .valueSeq()
                .map(this._renderItem) }
            <NewItem onSubmit={this._newItemAdded} />
          </ul>
        </div>
      </div>
    );
  }
}

export default List;
