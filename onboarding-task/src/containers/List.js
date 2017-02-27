import { connect } from 'react-redux';
import { addItem, deleteItem, updateItem } from '../actions/listActionCreators.js';
import { startEditItem, stopEditItem } from '../actions/editedItemsActionCreators.js';
import { List } from '../components/List.jsx';

const mapStateToProps = state => {
  return {
    list: state.list,
    editedItems: state.editedItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: text => {
      dispatch(addItem(text));
    },
    deleteItem: id => {
      dispatch(deleteItem(id));
    },
    updateItem: (id, text) => {
      dispatch(updateItem(id, text));
    },
    startEditingItem: id => {
      dispatch(startEditItem(id));
    },
    stopEditingItem: id => {
      dispatch(stopEditItem(id));
    },
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
