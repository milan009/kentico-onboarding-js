import React, { Component } from 'react';
import ExistingItem from './ExistingItem';
import NewItem from './NewItem';

function Item(description) {
  return {
    description: description,
    isEdited: false
  };
}

export default class List extends Component {
  state = {
    items: [
      new Item('Make a coffee'),
      new Item('Make a coffee great again'),
      new Item('We want you, coffee!'),
      new Item('Coffee can do it \uD83D\uDCAA')
    ]
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.newItemAdded = this.newItemAdded.bind(this);
    this.existingItemUpdated = this.existingItemUpdated.bind(this);
    this.existingItemDeleted = this.existingItemDeleted.bind(this);
  }

  newItemAdded(description) {
    const newItems = [
      ...this.state.items,
      new Item(description)
    ];

    this.setState({ items: newItems });
  }

  existingItemDeleted(atIndex) {
    const newItems = [
      ...this.state.items.slice(0, atIndex),
      ...this.state.items.slice(atIndex + 1)
    ];

    this.setState({ items: newItems });
  }

  existingItemUpdated(atIndex, withItem) {
    const newItems = [
      ...this.state.items.slice(0, atIndex),
      withItem,
      ...this.state.items.slice(atIndex + 1)
    ];

    this.setState({ items: newItems });
  }

  renderItem(item, index) {
    return <ExistingItem
      key={index}
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
                .map(this.renderItem) }
            <NewItem onSubmit={this.newItemAdded} />
          </ul>
        </div>
      </div>
    );
  }
}
