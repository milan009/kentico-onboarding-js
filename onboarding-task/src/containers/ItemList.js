import { connect } from 'react-redux';
import { addItem, deleteItem, updateItem } from '../actions/itemActionCreators.js';
import { startEditItem, stopEditItem } from '../actions/editModeActionCreators.js';
import { List } from '../components/List.jsx';

const mapStateToProps = (state) => {
  return {
    items: state.list,
    areEditable: state.areEditable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (text) => {
      dispatch(addItem(text));
    },
    deleteItem: (id) => {
      dispatch(deleteItem(id));
    },
    updateItem: (id, text) => {
      dispatch(updateItem(id, text));
    },
    startEditingItem: (id) => {
      dispatch(startEditItem(id));
    },
    stopEditingItem: (id) => {
      dispatch(stopEditItem(id));
    },
  };
};

const ItemList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ItemList };
