import React, { PureComponent } from 'react';
import uuidV4 from 'uuid/v4';

import { AddItem } from './AddItem';
import { ListItem } from './ListItem';

class List extends PureComponent {

  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  _removeItem = id => {
    const newItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: newItems });
  };

  _addNewItem = newItemText => {
    const newItem = {
      text: newItemText,
      id: uuidV4(),
      isEdited: false,
    };

    const newItems = [...this.state.items, newItem];

    this.setState({ items: newItems });
  };

    /** Expects change object argument in format:
     {
     <optional string> text:     <changedText>,
     <optional bool>   isEdited: <isEdited flag change>
     } */
  _saveChange = (id, change) => {
    const editedItems = this.state.items.map(item => {
      if (item.id !== id) {
        return item;
      }

      return {
        ...item,
        ...change,
      };
    });

    this.setState({ items: editedItems });
  };

  render() {
    const existingItems = this.state.items.map((item, index) =>
      (<ListItem
        index={index + 1}
        item={item}
        onRemove={this._removeItem}
        onSave={this._saveChange}
        key={item.id}
      />)
    );

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ol className="list-group">
            {existingItems}
            <AddItem addNewItem={this._addNewItem} />
          </ol>
        </div>
      </div>
    );
  }
}

export { List };
