import * as ReactRedux from 'react-redux';
import UpdateAllEditedItemsComponent from '../components/UpdateAllEditedItems';
import updateAllItemsDescription from '../actions/updateAllItemsDescription';

const mapStateToProps = state => {
  return {
    editedItems: state.editedItems,
    editedItemsCount: state.editedItems.count(),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAllItems: editedItems => dispatch(updateAllItemsDescription(editedItems)),
  };
};

const UpdateAllEditedItems = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateAllEditedItemsComponent);

export default UpdateAllEditedItems;
