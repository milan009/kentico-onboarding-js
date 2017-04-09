import * as React from 'react';

import { EditItem } from './EditItem';
import { Item } from '../models/Item';
import { ViewItem } from './ViewItem';

interface IListItemDataProps {
  item: Item;
  index: number;
  isInEditMode: boolean;
}

interface IListItemCallbacksProps {
  onItemValueEdit: (value: string) => void;
  onDelete: () => void;
  onViewChange: () => void;
}

class ListItem extends React.PureComponent<IListItemDataProps & IListItemCallbacksProps, undefined> {
  static displayName = 'ListItem';

  static propTypes = {
    item: React.PropTypes.instanceOf(Item).isRequired,
    index: React.PropTypes.number.isRequired,
    isInEditMode: React.PropTypes.bool.isRequired,
    onItemValueEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onViewChange: React.PropTypes.func.isRequired,
  };

  constructor(props: IListItemDataProps & IListItemCallbacksProps) {
    super(props);
  }

  _saveValue = (value: string) => {
    this.props.onItemValueEdit(value);
  };

  render() {
    const value: string = this.props.item.value;
    if (this.props.isInEditMode) {
      return (
        <EditItem
          value={value}
          index={this.props.index}
          onEdit={this._saveValue}
          onDelete={this.props.onDelete}
          onCancel={this.props.onViewChange}
        />);
    }
    return (
        <ViewItem
          value={value}
          index={this.props.index}
          onClick={this.props.onViewChange}
        />
    );
  }
}

export { ListItem, IListItemDataProps, IListItemCallbacksProps };
