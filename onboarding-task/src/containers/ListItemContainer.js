import { connect } from 'react-redux';
import { ListItem } from '../components/ListItem.jsx';
import { editItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../actionCreators/actionCreators.js';

// const mapStateToProps = (state, ownProps) => {
//   return { item: ownProps.item };
// };

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(deleteItem(ownProps.item.id)),
  onDoubleClick: () => dispatch(editItem(ownProps.item.id)),
  onSave: (text) => dispatch(saveChangesToItem(ownProps.item.id, text)),
  onCancel: () => dispatch(cancelChangesToItem(ownProps.item.id)),
});

const ListItemContainer = connect(
  null, // mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer };
