import * as React from 'react';

import { EditItem } from './EditItem';
import { Item } from '../models/IItem';

interface IListItemProps {
  item: Item
  index: number
  isBeingEdited: boolean;
  onItemValueEdit: (id: string, value: string) => void;
  onDelete: (deletedItemID: string) => void;
  onViewChange: (index: number) => void;
}

interface IListItemState {
}

class ListItem extends React.PureComponent<IListItemProps, IListItemState> {
  static displayName = 'ListItem';

  static propTypes = {
    item: React.PropTypes.instanceOf(Item).isRequired,
    index: React.PropTypes.number.isRequired,
    isBeingEdited: React.PropTypes.bool.isRequired,
    onItemValueEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onViewChange: React.PropTypes.func.isRequired,
  };

  constructor(props: IListItemProps) {
    super(props);
  }

  _changeView = () => {
    this.props.onViewChange(this.props.index);
  };

  _saveValue = (value: string) => {
    this.props.onItemValueEdit(this.props.item.id, value);
    this._changeView();
  };

  _deleteItem = () => {
    this.props.onDelete(this.props.item.id);
  };

  render() {
    const value: string = this.props.item.value;
    if (this.props.isBeingEdited) {
      return (
        <EditItem
          value={value}
          index={this.props.index}
          onEdit={this._saveValue}
          onDelete={this._deleteItem}
          onCancel={this._changeView}
        />);
    }
    return (
      <div onClick={this._changeView}>
        {this.props.index + 1}. {value}
      </div>
    );
  }
}

export { ListItem };
