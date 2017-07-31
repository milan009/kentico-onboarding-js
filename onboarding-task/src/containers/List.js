import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  itemIds: state.list.items.keySeq(),
});

const List = connect(mapStateToProps)(ListComponent);
export { List };
