import * as ReactRedux from 'react-redux';
import EditItemComponent from '../components/EditItem';
import storeEditedItemDescription from '../actions/storeEditedItemDescription';
import deleteItemAction from '../actions/deleteItem';
import updateItemDescriptionAction from '../actions/updateItemDescription';
import updateItemIsEdited from '../actions/updateItemIsEdited';
import { isStorable } from '../utils/text';

const mapStateToProps = (state, { item: { id, description: originalDescription } }) => {
  const editedDescription = state.editedItems.getIn([id, 'description'], '');

  return {
    description: editedDescription,
    isStorable: isStorable(editedDescription),
    isOriginal: editedDescription === originalDescription,
  };
};

const mapDispatchToProps = (dispatch, { item: { id, description: orginalDescription } }) => ({
  onDescriptionChange: newDescription => dispatch(storeEditedItemDescription(id, newDescription)),
  onUpdateButtonClick: newDescription => dispatch(updateItemDescriptionAction(id, newDescription)),
  onCancelButtonClick: () => dispatch(updateItemIsEdited(id, false)),
  onDeleteButtonClick: () => dispatch(deleteItemAction(id)),
  onOriginButtonClick: () => dispatch(storeEditedItemDescription(id, orginalDescription)),
});

const EditItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemComponent);

export default EditItem;
