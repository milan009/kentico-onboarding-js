import * as React from 'react';
const PropTypes = require('prop-types');
import { ItemEdit } from './ItemEdit';
import { ItemRead } from './ItemRead';
import { IItemViewModel } from '../models/IItemViewModel';
import { IAction } from '../actionCreators/IAction';

export interface IListItemDataProps {
  item: IItemViewModel;
}

export interface IListItemCallbackProps {
  onSave: (text: string) => IAction;
  onCancel: () => IAction;
  onDelete: () => IAction;
  onClick: () => IAction;
}

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbackProps> = ({
    item,
    onSave,
    onCancel,
    onDelete,
    onClick,
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
      onClick={onClick}
    />
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { ListItem };
