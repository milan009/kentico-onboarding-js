import { connect } from 'react-redux';

import { List } from '../components/List';

const mapStateToProps = (state) => {
  return {
    items: state.items.byId,
    itemsOrder: state.items.orderedIds,
  };
};

const ListContainer = connect(
  mapStateToProps
)(List);

export { ListContainer };
