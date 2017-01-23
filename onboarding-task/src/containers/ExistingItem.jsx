import * as ReactRedux from 'react-redux';
import VisibleExistingItem from '../components/ExistingItem';
import deleteItemAction from '../actions/deleteItem';
import updateItemDescriptionAction from '../actions/updateItemDescription';
import updateItemIsEdited from '../actions/updateItemIsEdited';

const mapStateToProps = (state, { item: { id } }) => {
  return {
    isEdited: state.editedItems.contains(id),
  };
};

const mapDispatchToProps = (dispatch, { item: { id } }) => {
  return {
    updateDescription: description => dispatch(updateItemDescriptionAction(id, description)),
    updateIsEdited: isEdited => dispatch(updateItemIsEdited(id, isEdited)),
    deleteItem: () => dispatch(deleteItemAction(id)),
  };
};

const ExistingItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisibleExistingItem);

export default ExistingItem;
