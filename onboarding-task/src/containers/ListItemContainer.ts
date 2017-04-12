const memoize = require('memoizee');
import { connect } from 'react-redux';
import { Dispatch } from '../stores/Dispatch';
import { IAppState } from '../stores/IAppState';
import { ListItem } from '../components/ListItem';
import { enableEditItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../actionCreators/actionCreators';
import { IItem } from '../interfaces/IItem';

export const itemViewModel = (item: IItem, index: number) => ({
  ...item.toObject(),
  index,
});

interface IListItemContainerProps {
  itemId: string;
  index: number;
}

const memoizedItem = memoize(itemViewModel);

const mapStateToProps = (state: IAppState, ownProps: IListItemContainerProps) => {
  const id = ownProps.itemId;
  const itemById = state.items.get(id);
  const indexedItem = memoizedItem(itemById, ownProps.index);

  return { item: indexedItem };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IListItemContainerProps) => ({
  onDelete: () => dispatch(deleteItem(ownProps.itemId)),
  onDoubleClick: () => dispatch(enableEditItem(ownProps.itemId)),
  onSave: (text: string) => dispatch(saveChangesToItem(ownProps.itemId, text)),
  onCancel: () => dispatch(cancelChangesToItem(ownProps.itemId)),
});

const ListItemContainer: React.ComponentClass<IListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer };
