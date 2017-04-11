import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { IViewItem } from '../viewModels/ViewItem';
import { EditForm } from './EditForm';
import { IAction } from '../actions/IAction';
import { ItemDetail } from './ItemDetail';

interface IItemProps {
  item: IViewItem;
  deleteItem: () => IAction;
  updateItem: (text: string) => IAction;
  startEditingItem: () => IAction;
  stopEditingItem: () => IAction;
}

const Item: React.StatelessComponent<IItemProps> = ({ item, deleteItem, updateItem, startEditingItem, stopEditingItem }) => (
  item.isEdited ?
    <EditForm
      item={item}
      onSave={updateItem}
      onDelete={deleteItem}
      onCancel={stopEditingItem}
    />
  : <ItemDetail startEditingItem={startEditingItem} index={item.index} text={item.text} />
);

Item.propTypes = {
  item: ImmutablePropTypes.recordOf({
    text: React.PropTypes.string,
    isEdited: React.PropTypes.bool,
    index: React.PropTypes.number,
  }).isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  updateItem: React.PropTypes.func.isRequired,
  startEditingItem: React.PropTypes.func.isRequired,
  stopEditingItem: React.PropTypes.func.isRequired,
};

export { Item };
