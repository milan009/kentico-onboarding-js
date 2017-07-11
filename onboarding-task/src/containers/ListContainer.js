import { connect } from 'react-redux';
import { ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  items: state.appState.listState.items,
});

const ListContainer = connect(mapStateToProps)(ListComponent);
export { ListContainer as List };
