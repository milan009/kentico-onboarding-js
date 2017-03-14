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
    item: selectViewItem(state, ownProps.id, ownProps.index),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IItemContainerProps) => {
  return {
    deleteItem: () => dispatch(deleteItem(ownProps.id)),
    updateItem: (text: string) => dispatch(updateItem(ownProps.id, text)),
    startEditingItem: () => dispatch(startEditItem(ownProps.id)),
    stopEditingItem: () => dispatch(stopEditItem(ownProps.id)),
  };
};

const ItemContainer: React.ComponentClass<IItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item);

export { ItemContainer as Item };
