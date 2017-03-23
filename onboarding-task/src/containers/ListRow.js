import { connect } from 'react-redux';
import { ListRow } from '../components/ListRow.jsx';
import { toggleEditItem, deleteItem, updateItem } from '../actions/actionCreators.js';

const mapStateToProps = (state, props) => {
  return {
    index: props.index,
    item: state.items.get(props.id),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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

const ListRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListRow);

export { ListRowContainer as ListRow };
