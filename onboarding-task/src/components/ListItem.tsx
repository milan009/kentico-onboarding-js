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

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbacksProps> = (props) => {
  const value = props.item.value;
  if (props.isInEditMode) {
    return (
      <EditItem
        value={value}
        index={props.index}
        onEdit={props.onItemValueEdit}
        onDelete={props.onDelete}
        onCancel={props.onViewChange}
      />);
  }
  return (
    <ViewItem
      value={value}
      index={props.index}
      onClick={props.onViewChange}
    />
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  item: React.PropTypes.instanceOf(Item).isRequired,
  index: React.PropTypes.number.isRequired,
  isInEditMode: React.PropTypes.bool.isRequired,
  onItemValueEdit: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onViewChange: React.PropTypes.func.isRequired,
};

export { ListItem, IListItemDataProps, IListItemCallbacksProps };
