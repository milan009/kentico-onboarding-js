import { connect } from 'react-redux';
import { ItemViewModel } from '../models/ItemViewModel';

import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../actions/actionCreators';
import { ListItem } from '../components/ListItem';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSave: (text) => dispatch(saveItem(ownProps.id, text)),
    onDelete: () => dispatch(deleteItem(ownProps.id)),
    onUpdate: (text) => dispatch(updateItemText(ownProps.id, text)),
    onCancel: () => dispatch(stopEditingItem(ownProps.id)),
    onEdit: () => dispatch(startEditingItem(ownProps.id)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const item = state.items.itemsByIds.get(ownProps.id);
  return {
    item: new ItemViewModel({
      id: item.id,
      text: item.textShown,
      index: ownProps.index,
      isEditing: item.isEditing,
    }),

  };
};

const listItemContainer = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { listItemContainer as ListItem };
