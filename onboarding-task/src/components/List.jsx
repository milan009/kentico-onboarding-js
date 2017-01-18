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
            Item.Create('Make a coffee'),
            Item.Create('Make a coffee great again'),
            Item.Create('We want you, coffee!'),
            Item.Create('Coffee can do it \uD83D\uDCAA'),
          ]
            .map(item => [item.id, item])
        )
    };

    this.renderItem = this.renderItem.bind(this);
    this.newItemAdded = this.newItemAdded.bind(this);
    this.existingItemUpdated = this.existingItemUpdated.bind(this);
    this.existingItemDeleted = this.existingItemDeleted.bind(this);
  }

  newItemAdded(description) {
    const newItem = Item.Create(description);
    const newItems = this.state.items.set(newItem.id, newItem);

    this.setState({ items: newItems });
  }

  existingItemDeleted(id) {
    const newItems = this.state.items.delete(id);

    this.setState({ items: newItems });
  }

  existingItemUpdated(item) {
    const newItems = this.state.items.set(item.id, item);

    this.setState({ items: newItems });
  }

  renderItem(item, index) {
    return <ExistingItem
      key={item.id}
      index={index + 1}
      item={item}
      onItemDeleted={this.existingItemDeleted}
      onItemUpdated={this.existingItemUpdated}
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
                .map(this.renderItem) }
            <NewItem onSubmit={this.newItemAdded} />
          </ul>
        </div>
      </div>
    );
  }
}

export default List;
