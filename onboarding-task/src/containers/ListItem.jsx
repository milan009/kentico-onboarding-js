import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { toggleEditMode, updateItemText, deleteItem } from '../actions/actionCreators.ts';
import memoize from 'memoizee';
import { ViewItemRecord } from '../utils/itemRecord';

export const viewItem = (itemData, itemFlags) => new ViewItemRecord({
  guid: itemData.guid,
  text: itemData.text,
  isEdited: itemFlags.isEdited,
});
const selectViewItem = memoize(viewItem);

const mapStateToProps = (state, ownProps) => {
  const itemData = state.itemsById.get(ownProps.guid);
  const itemFlags = state.itemsFlags.get(ownProps.guid);

  return {
    item: selectViewItem(itemData, itemFlags),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleEditMode: (guid) => dispatch(toggleEditMode(guid)),
    onUpdateText: (guid, text) => dispatch(updateItemText(guid, text)),
    onDelete: (guid) => dispatch(deleteItem(guid)),
  };
};

const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);

export { ListItem };

