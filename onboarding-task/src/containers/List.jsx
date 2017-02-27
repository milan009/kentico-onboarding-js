import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
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

const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

export { List };

