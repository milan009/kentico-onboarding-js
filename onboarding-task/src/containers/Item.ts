const { connect } = require('react-redux');
import { Dispatch } from 'redux';

import { IAppState } from '../stores/IAppState';
import { Item } from '../components/Item';
import { deleteItem, updateItem } from '../actions/itemsActionCreators';
import { startEditItem, stopEditItem } from '../actions/editedItemsActionCreators';
import { IAction } from '../actions/IAction';
import { selectViewItem } from '../selectors/selectViewItem';

interface IItemContainerProps {
  id: string;
  index: number;
}

const mapStateToProps = (state: IAppState, ownProps: IItemContainerProps) => {
  return {
    item: selectViewItem(state, ownProps.id),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    deleteItem: (id: string) => dispatch(deleteItem(id)),
    updateItem: (id: string, text: string) => dispatch(updateItem(id, text)),
    startEditingItem: (id: string) => dispatch(startEditItem(id)),
    stopEditingItem: (id: string) => dispatch(stopEditItem(id)),
  };
};

const ItemContainer: React.ComponentClass<IItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item);

export { ItemContainer as Item };
