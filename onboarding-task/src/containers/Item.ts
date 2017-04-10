import { connect } from 'react-redux';
import { Dispatch } from '../stores/Dispatch';
import { IAppState } from '../stores/IAppState';
import { Item } from '../components/Item';
import { deleteItem, updateItem } from '../actions/itemsActionCreators';
import { startEditItem, stopEditItem } from '../actions/editedItemsActionCreators';
import { selectViewItem } from '../selectors/selectViewItem';

interface IItemContainerProps {
  id: string;
  index: number;
}

const mapStateToProps = (state: IAppState, ownProps: IItemContainerProps) => {
  const item = state.items.get(ownProps.id);
  const isEdited = state.editedItems.has(ownProps.id);
  return {
    item: selectViewItem(item, isEdited, ownProps.index),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IItemContainerProps) => {
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
