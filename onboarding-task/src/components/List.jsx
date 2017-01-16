import React, { Component } from 'react';
import ExistingItem from './ExistingItem';
import NewItem from './NewItem';
import Guid from 'guid';
import * as Immutable from "immutable";

function Item(description) {
  return {
    id: Guid.create(),
    description: description,
    isEdited: false
  };
}

export default class List extends Component {
  state = {
    items: Immutable
      .Map([
          new Item('Make a coffee'),
          new Item('Make a coffee great again'),
          new Item('We want you, coffee!'),
          new Item('Coffee can do it \uD83D\uDCAA')
        ]
        .map(item => [item.id, item])
      )
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.newItemAdded = this.newItemAdded.bind(this);
    this.existingItemUpdated = this.existingItemUpdated.bind(this);
    this.existingItemDeleted = this.existingItemDeleted.bind(this);
  }

  newItemAdded(description) {
    const newItem = new Item(description);
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
      listIndex={index}
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
