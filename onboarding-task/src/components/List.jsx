import React, { PureComponent } from 'react';
import uuidV4 from 'uuid/v4';
import {
  OrderedMap,
  Record,
} from 'immutable';

import { AddItem } from './AddItem';
import { ListItem } from './ListItem';

class ItemRecord extends Record({
  id: undefined,
  text: undefined,
  isEdited: undefined,
}) {
  constructor(id, text, isEdited = false) {
    super({
      id,
      text,
      isEdited,
    }, 'ItemRecord');
  }
}

class List extends PureComponent {

  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: OrderedMap(),
    };
  }

  _removeItem = id => {
    const newItems = this.state.items.delete(id);
    this.setState({ items: newItems });
  };

  _addNewItem = newItemText => {
    const newItem = new ItemRecord(
      uuidV4(),
      newItemText,
      false);

    const newItems = this.state.items.set(newItem.id, newItem);

    this.setState({ items: newItems });
  };

  _saveChange = (id, text, isEdited) => {
    const editedItems = this.state.items.set(id,
      new ItemRecord(
      id,
      text,
      isEdited));

    this.setState({ items: editedItems });
  };

  render() {
    const existingItems = this.state.items.toArray().map((item, index) =>
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
