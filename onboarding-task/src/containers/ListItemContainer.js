import { connect } from 'react-redux';
import { ListItem } from '../components/ListItem.jsx';
import { enableEditItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../actionCreators/actionCreators.js';

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.itemId;
  const itemById = state.items.get(id);
  return { item: itemById };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(deleteItem(ownProps.itemId)),
  onDoubleClick: () => dispatch(enableEditItem(ownProps.itemId)),
  onSave: (text) => dispatch(saveChangesToItem(ownProps.itemId, text)),
  onCancel: () => dispatch(cancelChangesToItem(ownProps.itemId)),
});

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer };
