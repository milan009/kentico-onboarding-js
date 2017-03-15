import * as React from 'react';

import { EditItem } from './EditItem';
import { Item } from '../models/Item';
import { ViewItem } from './ViewItem';

interface IListItemProps {
  item: Item;
  index: number;
  isInEditMode: boolean;
  onItemValueEdit: (id: string, value: string) => void;
  onDelete: (deletedItemID: string) => void;
  onViewChange: (id: string) => void;
}

class ListItem extends React.PureComponent<IListItemProps, undefined> {
  static displayName = 'ListItem';

  static propTypes = {
    item: React.PropTypes.instanceOf(Item).isRequired,
    index: React.PropTypes.number.isRequired,
    isInEditMode: React.PropTypes.bool.isRequired,
    onItemValueEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onViewChange: React.PropTypes.func.isRequired,
  };

  constructor(props: IListItemProps) {
    super(props);
  }

  _toggleViewMode = () => {
    this.props.onViewChange(this.props.item.id);
  };

  _saveValue = (value: string) => {
    this.props.onItemValueEdit(this.props.item.id, value);
    this._toggleViewMode();
  };

  _deleteItem = () => {
    this.props.onDelete(this.props.item.id);
  };

  render() {
    const value: string = this.props.item.value;
    if (this.props.isInEditMode) {
      return (
        <EditItem
          value={value}
          index={this.props.index}
          onEdit={this._saveValue}
          onDelete={this._deleteItem}
          onCancel={this._toggleViewMode}
        />);
    }
    return (
        <ViewItem
          value={value}
          index={this.props.index}
          onClick={this._toggleViewMode}
        />
    );
  }
}

export { ListItem };
