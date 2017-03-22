import { connect } from 'react-redux';
import { List } from '../components/List.jsx';
import { createItem, toggleEditItem, deleteItem, updateItem } from '../actions/actionCreators.js';

const mapStateToProps = (state) => {
  return { items: state.items };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemAdd: (text) => {
      dispatch(createItem(text));
    },
    onItemClick: (id) => {
      dispatch(toggleEditItem(id));
    },
    onItemDelete: (id) => {
      dispatch(deleteItem(id));
    },
    onItemUpdate: (id, text) => {
      dispatch(updateItem(id, text));
      dispatch(toggleEditItem(id));
    },
    onItemCancel: (id) => {
      dispatch(toggleEditItem(id));
    },
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer };
