import React, { Component } from 'react';
import DisplayItem from './DisplayItem';
import EditItem from './EditItem';
import NewItem from './NewItem'

export default class List extends Component {
  state = {
    items: [
      {
        description: 'Make a coffee',
        isEdited: false
      },
      {
        description: 'Make a coffee great again',
        isEdited: false
      },
      {
        description: 'We want you, coffee!',
        isEdited: false
      },
      {
        description: 'Coffee can do it \uD83D\uDCAA',
        isEdited: false
      }
    ]
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.newItemAdded = this.newItemAdded.bind(this);
    this.updateItemAt = this.updateItemAt.bind(this);
    this.existingItemClicked = this.existingItemClicked.bind(this);
    this.existingItemUpdated = this.existingItemUpdated.bind(this);
  }

  newItemAdded(description) {
    const newItem = {
      description: description,
      isEdited: false
    };
    const newItems = [
      ...this.state.items,
      newItem
    ];

    this.setState({ items: newItems });
  }

  toggleEdition(item) {
    return {
      ...item,
      isEdited: !item.isEdited
    }
  }

  updateDescription(item, description) {
    return {
      ...item,
      description: description
    }
  }

  updateItemAt(index, update) {
    const existingItem = this.state.items[index];
    const updatedItem = update(existingItem);
    return [
      ...this.state.items.slice(0, index),
      updatedItem,
      ...this.state.items.slice(index + 1)
    ];
  }

  existingItemClicked(index) {
    const newItems = this.updateItemAt(index, this.toggleEdition);
    this.setState({ items: newItems });
  }

  existingItemUpdated(operation, index, description) {
    let newItems = null;
    switch(operation){
      case 'update':
        newItems = this.updateItemAt(index, item => {
          let updatedItem = this.updateDescription(item, description);
          updatedItem  = this.toggleEdition(updatedItem );
          return updatedItem;
        });
        break;
      case 'cancel':
        newItems = this.updateItemAt(index, this.toggleEdition);
        break;
      case 'delete':
        newItems = [
          ...this.state.items.slice(0, index),
          ...this.state.items.slice(index + 1)
        ];
        break;
      default:
        throw new Error('Operation "' + operation + '" at index ' + index + ' is not known');
    }
    this.setState({ items: newItems });
  }

  renderItem(item, index) {
    return item.isEdited
      ? <EditItem
          key={index}
          index={index}
          onButtonClick={this.existingItemUpdated}
          {...item}
        />
      : <DisplayItem
          key={index}
          index={index}
          onItemClick={this.existingItemClicked}
          {...item}
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
