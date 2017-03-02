import { connect } from 'react-redux';
import memProfile from 'memoizee/profile';

import { List } from '../components/List';
import { createListItem } from '../actionCreators/actionCreators';

const mapStateToProps = (state) => {
  return {
    itemsOrder: state.items.orderedIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onListItemAdd: (text) => {
      console.log(memProfile.log());
      dispatch(createListItem(text));
    },
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export { ListContainer };
