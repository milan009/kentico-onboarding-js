import * as ReactRedux from 'react-redux';
import ListComponent from '../components/List';
import { getStorableEditedItems } from '../utils/item';

const mapStateToProps = state => ({
  items: state.items,
  isMultipleItemsEdited: getStorableEditedItems(state.editedItems).count() > 1,
});

const mapDispatchToProps = () => ({});

const List = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListComponent);

export default List;
