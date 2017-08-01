import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  itemIds: state.items.itemsById.keySeq(),
});

const List = connect(mapStateToProps)(ListComponent);
export { List };
