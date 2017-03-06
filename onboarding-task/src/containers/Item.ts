import {IViewItem} from '../viewModels/ViewItem';
const { connect } = require('react-redux');
import { Item } from '../components/Item';
import { Dispatch } from 'redux';

import { deleteItem, updateItem } from '../actions/itemsActionCreators';
import { startEditItem, stopEditItem } from '../actions/editedItemsActionCreators';
import { IAction } from '../actions/IAction';

interface IItemContainerProps {
  item: IViewItem;
  index: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    deleteItem: (id: string) => dispatch(deleteItem(id)),
    updateItem: (id: string, text: string) => dispatch(updateItem(id, text)),
    startEditingItem: (id: string) => dispatch(startEditItem(id)),
    stopEditingItem: (id: string) => dispatch(stopEditItem(id)),
  };
};

const ItemContainer: React.ComponentClass<IItemContainerProps> = connect(
  undefined,
  mapDispatchToProps,
)(Item);

export { ItemContainer as Item };
