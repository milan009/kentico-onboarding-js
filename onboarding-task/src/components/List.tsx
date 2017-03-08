import * as React from 'react';
import * as Immutable from 'immutable';

import { ListItem } from './ListItem';
import { AddItem } from './AddItem';
import { generateGuid } from '../utils/generateGuid';
import { Item } from '../models/IItem';
import { ItemFlags } from '../models/IItemFlags';

interface IListProps {
}

interface IListState {
  items: Immutable.Map<string,Item>;
  itemsOrder: Immutable.List<string>;
  itemsDisplayFlags: Immutable.Map<string, ItemFlags>;
}

class List extends React.PureComponent<IListProps, IListState> {
  static displayName = 'List';

  constructor(props: IListProps) {
    super(props);
    this.state = {
      items: Immutable.Map<string,Item>(),
      itemsOrder: Immutable.List<string>(),
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
      itemsOrder: this.state.itemsOrder.push(newItem.id),
      itemsDisplayFlags: this.state.itemsDisplayFlags.set(newItem.id, itemFlags)
    });
  };

  _editItemValue = (id: string, value: string) => {
    const newItemFlags = this.state.itemsDisplayFlags.setIn([id, 'editMode'], false) as ItemFlags;

    this.setState({
      items: this.state.items.setIn([id, 'value'], value),
      itemsDisplayFlags: this.state.itemsDisplayFlags.set(id, newItemFlags)
    })
  };

  _deleteItem = (deletedItemId: string) => {
    const itemIndex = this.state.itemsOrder.indexOf(deletedItemId);

    this.setState({
      items: this.state.items.delete(deletedItemId),
      itemsOrder: this.state.itemsOrder.delete(itemIndex),
      itemsDisplayFlags: this.state.itemsDisplayFlags.delete(deletedItemId)
    });
  };

  _toggleItemViewMode = (id: string) => {
    const newFlag = !this.state.itemsDisplayFlags.get(id).editMode;

    const newItemsDisplayFlags = this.state.itemsDisplayFlags.setIn([id, 'editMode'], newFlag);

    this.setState({ itemsDisplayFlags: newItemsDisplayFlags });
  };

  _renderListItems = () => {
    return this.state.itemsOrder.map((id: string, index: number) =>
      <li className="list-group-item" key={id}>
        <ListItem
          item={this.state.items.get(id)}
          index={index}
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
