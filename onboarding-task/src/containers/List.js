import { connect } from 'react-redux';
import { List } from '../components/List.jsx';
import { createItem } from '../actions/actionCreators.js';
import { OrderedSet } from 'immutable';

const mapStateToProps = (state) => {
  return { itemIds: OrderedSet.fromKeys(state.items) };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemAdd: (text) => dispatch(createItem(text)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
