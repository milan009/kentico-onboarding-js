import * as React from 'react';

import { ListItem } from './ListItem';
import { AddItem } from './AddItem';
import { generateGuid } from '../utils/generateGuid';

interface IListProps {
}

interface IListState {
  items: any
}

class List extends React.PureComponent<IListProps, IListState> {
  static displayName = 'List';

  constructor(props: any) {
    super(props);
    this.state = { items: {} };
  }

  _addItem = (value: string) => {
    const newItem = {
      id: generateGuid(),
      value };
    const items = {
      ...this.state.items,
      [newItem.id]: newItem };
    this.setState({ items });
  };

  _editItemValue = (id: string, value: string) => {
    const editedItem = {
      id,
      value };
    const items = {
      ...this.state.items,
      [id]: editedItem };
    this.setState({ items });
  };

  _deleteItem = (deletedItemID: string) => {
    const items = { ...this.state.items };
    delete items[deletedItemID];
    this.setState({ items });
  };

  _renderListItems = () => {
    return Object.keys(this.state.items).map((id, index) =>
      <li className="list-group-item" key={id}>
        <ListItem
          item={this.state.items[id]}
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
