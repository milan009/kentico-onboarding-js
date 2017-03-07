import * as React from 'react';
import * as Immutable from 'immutable';

import { ListItem } from './ListItem';
import { AddItem } from './AddItem';
import { generateGuid } from '../utils/generateGuid';
import { Item } from '../models/IItem';

interface IListProps {
}

interface IListState {
  items: Immutable.Map<string,Item> ;
  itemsOrder: Immutable.List<string>;
}

class List extends React.PureComponent<IListProps, IListState> {
  static displayName = 'List';

  constructor(props: IListProps) {
    super(props);
    this.state = { items: Immutable.Map<string,Item>(), itemsOrder: Immutable.List<string>() };
  }

  _addItem = (value: string) => {
    const newItem: Item = new Item({
        id: generateGuid(),
        value
      });
    this.setState({ items: this.state.items.set(newItem.id, newItem), itemsOrder: this.state.itemsOrder.push(newItem.id) });
  };

  _editItemValue = (id: string, value: string) => {
    const editedItem = new Item({
      id,
      value
    });
    this.setState({ items: this.state.items.update(id, () => editedItem) })
  };

  _deleteItem = (deletedItemID: string) => {
    const itemIndex = this.state.itemsOrder.indexOf(deletedItemID);
    this.setState({ items: this.state.items.delete(deletedItemID), itemsOrder: this.state.itemsOrder.delete(itemIndex)});
  };

  _renderListItems = () => {
    return this.state.itemsOrder.map((id: string, index: number) =>
      <li className="list-group-item" key={id}>
        <ListItem
          item={this.state.items.get(id)}
          index={index + 1}
          onItemValueEdit={this._editItemValue}
          onDelete={this._deleteItem}
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
