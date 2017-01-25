import * as ReactRedux from 'react-redux';
import ListComponent from '../components/List';
import { getStorableEditedItems } from '../utils/item';

const mapStateToProps = state => ({
  items: state.items,
  isMultipleItemsEdited: getStorableEditedItems(state.editedItems).count() > 1,
});

const List = ReactRedux.connect(
  mapStateToProps
)(ListComponent);

export default List;
