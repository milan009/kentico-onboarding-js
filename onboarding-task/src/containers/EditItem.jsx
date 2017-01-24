import * as ReactRedux from 'react-redux';
import EditItemComponent from '../components/EditItem';
import storeEditedItemDescription from '../actions/storeEditedItemDescription';
import deleteItemAction from '../actions/deleteItem';
import updateItemDescriptionAction from '../actions/updateItemDescription';
import updateItemIsEdited from '../actions/updateItemIsEdited';

const mapStateToProps = (state, { item: { id } }) => ({
  editedDescription: state.editedItems.get(id, ''),
});

const mapDispatchToProps = (dispatch, { item: { id } }) => ({
  onDescriptionChange: description => dispatch(storeEditedItemDescription(id, description)),
  onUpdateButtonClick: description => dispatch(updateItemDescriptionAction(id, description)),
  onCancelButtonClick: () => dispatch(updateItemIsEdited(id, false)),
  onDeleteButtonClick: () => dispatch(deleteItemAction(id)),
});

const EditItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);

export default EditItem;
