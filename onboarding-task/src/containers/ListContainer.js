import { connect } from 'react-redux';

import List from '../components/List';

const mapStateToProps = (state) => {
  return {
    items: state.items,
    itemsOrder: state.itemsOrder,
  };
};

const ListContainer = connect(
  mapStateToProps
)(List);

export { ListContainer };
