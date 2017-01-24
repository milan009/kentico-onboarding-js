import * as ReactRedux from 'react-redux';
import UpdateAllEditedItemsComponent from '../components/UpdateAllEditedItems';
import updateAllItemsDescriptionAction from '../actions/updateAllItemsDescription';
import { getStorableEditedItems } from '../utils/item';

const mapStateToProps = ({ editedItems }) => {
  const storableItems = getStorableEditedItems(editedItems);

  return {
    storableItems,
    storableItemsCount: storableItems.count(),
  };
};

const mapDispatchToProps = dispatch => ({
  updateAllItems: storableItems => dispatch(updateAllItemsDescriptionAction(storableItems)),
});

const UpdateAllEditedItems = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateAllEditedItemsComponent);

export default UpdateAllEditedItems;
