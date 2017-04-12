import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { toggleEditMode, updateItemText, deleteItem } from '../actions/actionCreators.ts';
import memoize from 'memoizee';

const selectViewItem = (itemData, itemFlags) => ({
  guid: itemData.guid,
  text: itemData.text,
  isEdited: itemFlags.isEdited,
});
const memoizedSelectViewItem = memoize(selectViewItem);

const mapStateToProps = (state, ownProps) => {
  const itemData = state.itemsById.get(ownProps.guid);
  const itemFlags = state.itemsFlags.get(ownProps.guid);

  return {
    item: memoizedSelectViewItem(itemData, itemFlags),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleEditMode: () => dispatch(toggleEditMode(ownProps.guid)),
    onUpdateText: (guid, text) => dispatch(updateItemText(ownProps.guid, text)),
    onDelete: () => dispatch(deleteItem(ownProps.guid)),
  };
};

const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);

export { ListItem, selectViewItem };

