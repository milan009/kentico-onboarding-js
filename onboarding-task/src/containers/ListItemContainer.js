import { connect } from 'react-redux';

import {
  saveItem,
  deleteItem,
  startEditingItem,
  stopEditingItem,
  updateItemText,
} from '../actions/actionCreators';
import { ListItem } from '../components/ListItem';

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (id, text) => dispatch(saveItem(id, text)),
    onDelete: (id) => dispatch(deleteItem(id)),
    onUpdate: (id, text) => dispatch(updateItemText(id, text)),
    onCancel: (id) => dispatch(stopEditingItem(id)),
    onEdit: (id) => dispatch(startEditingItem(id)),
  };
};

const listItemContainer = connect(undefined, mapDispatchToProps)(ListItem);

export { listItemContainer as ListItem };
