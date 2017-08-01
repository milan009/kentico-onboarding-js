import { connect } from 'react-redux';
import memoize from 'memoizee';

import { List as ListComponent } from '../components/List';

const getIdsMemoized = memoize((items) => items.keySeq());

const mapStateToProps = (state) => ({
  itemIds: getIdsMemoized(state.items.itemsById),
});

const List = connect(mapStateToProps)(ListComponent);
export { List };
