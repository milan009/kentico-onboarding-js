import * as ReactRedux from 'react-redux';
import EditItemComponent from '../components/EditItem';
import storeEditedItemDescription from '../actions/storeEditedItemDescription';
import deleteItemAction from '../actions/deleteItem';
import updateItemDescriptionAction from '../actions/updateItemDescription';
import updateItemIsEdited from '../actions/updateItemIsEdited';
import { isStorable } from '../utils/text';

const mapStateToProps = (state, { item: { id } }) => {
  const editedItem = state.editedItems.get(id);

  return {
    description: editedItem.description,
    isStorable: isStorable(editedItem.description) && !editedItem.isOriginal,
    isOriginal: editedItem.isOriginal,
  };
};

const mapDispatchToProps = (dispatch, { item: { id, description: orginalDescription } }) => ({
  onDescriptionChange: (newDescription, isOriginal) => dispatch(storeEditedItemDescription(id, newDescription, isOriginal)),
  onUpdateButtonClick: newDescription => dispatch(updateItemDescriptionAction(id, newDescription)),
  onCancelButtonClick: () => dispatch(updateItemIsEdited(id, false)),
  onDeleteButtonClick: () => dispatch(deleteItemAction(id)),
  onOriginButtonClick: () => dispatch(storeEditedItemDescription(id, orginalDescription, true)),
});

const EditItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);

export default EditItem;
