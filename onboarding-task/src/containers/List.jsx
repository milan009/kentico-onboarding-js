import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { toggleEditMode, deleteItem, updateItemText, addItem } from '../actions/actionCreators.js';
import { selectViewItems } from '../selectors/selectViewItems';

const mapStateToProps = (state) => {
  const items = selectViewItems(state);
  return {
    itemsById: items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleEditMode: (guid) => dispatch(toggleEditMode(guid)),
    onDelete: (guid) => dispatch(deleteItem(guid)),
    onUpdate: (guid, text) => dispatch(updateItemText(guid, text)),
    onAddItem: (text) => dispatch(addItem(text)),
  };
};

const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

export { List };

