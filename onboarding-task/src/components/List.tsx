import * as React from 'react';
import * as Immutable from 'immutable';

import { ListItem } from './ListItem';
import { AddItem } from './AddItem';
import { generateGuid } from '../utils/generateGuid';
import { Item } from '../models/Item';
import { ItemFlags } from '../models/ItemFlags';

interface IListState {
  items: Immutable.Map<string,Item>;
  itemsOrder: Immutable.OrderedSet<string>;
  itemsDisplayFlags: Immutable.Map<string, ItemFlags>;
}

class List extends React.PureComponent<undefined, IListState> {
  static displayName = 'List';

  constructor(props: undefined) {
    super(props);
    this.state = {
      items: Immutable.Map<string,Item>(),
      itemsOrder: Immutable.OrderedSet<string>(),
      itemsDisplayFlags: Immutable.Map<string, ItemFlags>()
    };
  }

  _addItem = (value: string) => {
    const newItem = new Item({
      id: generateGuid(),
      value
    });
    const itemFlags = new ItemFlags({
      editMode: false
    });

    this.setState({
      items: this.state.items.set(newItem.id, newItem),
      itemsOrder: this.state.itemsOrder.add(newItem.id),
      itemsDisplayFlags: this.state.itemsDisplayFlags.set(newItem.id, itemFlags)
    });
  };

  _editItemValue = (id: string, value: string) => {
    const newItemsDisplayFlags = this.state.itemsDisplayFlags.setIn([id, 'editMode'], false);

    this.setState({
      items: this.state.items.setIn([id, 'value'], value),
      itemsDisplayFlags: newItemsDisplayFlags
    })
  };

  _deleteItem = (deletedItemId: string) => {
    this.setState({
      items: this.state.items.delete(deletedItemId),
      itemsOrder: this.state.itemsOrder.delete(deletedItemId),
      itemsDisplayFlags: this.state.itemsDisplayFlags.delete(deletedItemId)
    });
  };

  _toggleItemViewMode = (id: string) => {
    const newFlag = !this.state.itemsDisplayFlags.get(id).editMode;

    const newItemsDisplayFlags = this.state.itemsDisplayFlags.setIn([id, 'editMode'], newFlag);

    this.setState({ itemsDisplayFlags: newItemsDisplayFlags });
  };

  _renderListItems = () => {
    return this.state.itemsOrder.toIndexedSeq().map((id: string, zeroBasedIndex: number) =>
      <li className="list-group-item" key={id}>
        <ListItem
          item={this.state.items.get(id)}
          index={zeroBasedIndex + 1}
          isInEditMode={this.state.itemsDisplayFlags.get(id).editMode}
          onItemValueEdit={this._editItemValue}
          onDelete={this._deleteItem}
          onViewChange={this._toggleItemViewMode}
        />
      </li>
    );
  };

  render() {
    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {this._renderListItems()}
          <li className="list-group-item">
            <AddItem onAdd={this._addItem} />
          </li>
        </ul>
      </div>
    );
  }
}

export { List };
