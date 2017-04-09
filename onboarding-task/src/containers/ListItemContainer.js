import { connect } from 'react-redux';
import { ListItem } from '../components/ListItem.jsx';
import { editItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../actionCreators/actionCreators.js';

// const mapStateToProps = (state, ownProps) => {
//   return { item: ownProps.item };
// };

const mapDispatchToProps = (dispatch, props) => ({
  index: props.index,
  onDelete: (id) => dispatch(deleteItem(id)),
  onDoubleClick: (id) => dispatch(editItem(id)),
  onSave: (id, text) => dispatch(saveChangesToItem(id, text)),
  onCancel: (id) => dispatch(cancelChangesToItem(id)),
});

const ListItemContainer = connect(
  null, // mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer };
