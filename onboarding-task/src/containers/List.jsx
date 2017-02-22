import { connect } from 'react-redux';
import List from '../components/List';
import { toggleEditMode, deleteItem, updateItem, addItem } from '../actions/actionCreators.js';

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleEditMode: (guid) => dispatch(toggleEditMode(guid)),
    onDelete: (guid) => dispatch(deleteItem(guid)),
    onUpdate: (guid, text) => dispatch(updateItem(guid, text)),
    onAddItem: (text) => dispatch(addItem(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

