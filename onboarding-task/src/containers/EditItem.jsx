import * as ReactRedux from 'react-redux';
import EditItemComponent from '../components/EditItem';
import storeEditedItemDescriptionAction from '../actions/storeEditedItemDescription';
import deleteItemAction from '../actions/deleteItem';
import updateItemDescriptionAction from '../actions/updateItemDescription';
import cancelItemEditionAction from '../actions/cancelItemEdition';
import { isNotEmpty } from '../utils/text';

const mapStateToProps = (state, { item: { id } }) => {
  const editedItem = state.editedItems.get(id);

  return {
    description: editedItem.description,
    isStorable: isNotEmpty(editedItem.description) && !editedItem.isOriginal,
    isOriginal: editedItem.isOriginal,
  };
};

const mapDispatchToProps = (dispatch, { item: { id, description: orginalDescription } }) => ({
  onDescriptionChange: (newDescription, isOriginal) => dispatch(storeEditedItemDescriptionAction(id, newDescription, isOriginal)),
  onUpdateButtonClick: newDescription => dispatch(updateItemDescriptionAction(id, newDescription)),
  onCancelButtonClick: () => dispatch(cancelItemEditionAction(id)),
  onDeleteButtonClick: () => dispatch(deleteItemAction(id)),
  onOriginButtonClick: () => dispatch(storeEditedItemDescriptionAction(id, orginalDescription, true)),
});

const EditItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);

export default EditItem;
