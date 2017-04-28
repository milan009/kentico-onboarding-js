/**
 * Created by VlastimilM on 9.4.2017.
 */
import { connect } from 'react-redux';

import { List } from '../components/List';

const mapStateToProps = (state) => {
  return {
    itemsByIds: state.items.itemsByIds,
    orderedIds: state.items.orderedIds,
  };
};

const listContainer = connect(mapStateToProps)(List);

export { listContainer as List };
