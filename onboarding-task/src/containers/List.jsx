import * as ReactRedux from 'react-redux';
import ListComponent from '../components/List';

const mapStateToProps = state => ({
  ...state,
  isMultipleItemsEdited: state.editedItems.count() > 1,
});

const mapDispatchToProps = () => ({});

const List = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListComponent);

export default List;
