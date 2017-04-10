import { connect } from 'react-redux';
import { ListItem } from '../components/ListItem.jsx';
import { editItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../actionCreators/actionCreators.js';
import { IndexedItem } from '../models/IndexedItem';

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.itemID;
  const itemById = state.items.get(id);
  const indexedItem = IndexedItem(itemById, ownProps.index);
  return { item: indexedItem };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(deleteItem(ownProps.itemID)),
  onDoubleClick: () => dispatch(editItem(ownProps.itemID)),
  onSave: (text) => dispatch(saveChangesToItem(ownProps.itemID, text)),
  onCancel: () => dispatch(cancelChangesToItem(ownProps.itemID)),
});

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer };
