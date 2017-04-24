import * as memoize from 'memoizee';
import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { toggleEditMode, updateItemText, deleteItem } from '../actions/actionCreators';
import { ItemRecord } from '../models/ItemRecord';
import { IAppState } from '../models/IAppState';
import { Dispatch } from '../actions/Dispatch';

const selectViewItem = (itemData: ItemRecord, itemFlags: IItemFlags) => ({
  guid: itemData.guid,
  text: itemData.text,
  isEdited: itemFlags.isEdited,
});
const memoizedSelectViewItem = memoize(selectViewItem);

const mapStateToProps = (state: IAppState, ownProps: ItemRecord) => {
  const itemData = state.itemsById.get(ownProps.guid);
  const itemFlags = state.itemsFlags.get(ownProps.guid);

  return {
    item: memoizedSelectViewItem(itemData, itemFlags),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ItemRecord) => {
  return {
    onToggleEditMode: () => dispatch(toggleEditMode(ownProps.guid)),
    onUpdateText: (text: string) => dispatch(updateItemText(ownProps.guid, text)),
    onDelete: () => dispatch(deleteItem(ownProps.guid)),
  };
};

const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);

export { ListItem, selectViewItem };
