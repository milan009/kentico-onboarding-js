import * as React from 'react';
import { ItemEdit } from './ItemEdit';
import { ItemRead } from './ItemRead';
import { IItemViewModel } from '../interfaces/IItemViewModel';
import { IAction } from '../interfaces/IAction';

interface IListItemDataProps {
  item: IItemViewModel;
}

interface IListItemCallbackProps {
  onSave: (text: string) => IAction;
  onCancel: () => IAction;
  onDelete: () => IAction;
  onDoubleClick: () => IAction;
}

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbackProps> = ({
    item,
    onSave,
    onCancel,
    onDelete,
    onDoubleClick,
}) => {
  if (item.isEdited) {
    return (
      <ItemEdit
        key={item.id}
        item={item}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
  }
  return (
    <ItemRead
      key={item.id}
      item={item}
      onDoubleClick={onDoubleClick}
    />
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  item: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    isEdited: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
  }).isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onDoubleClick: React.PropTypes.func.isRequired,
};

export { ListItem };
