import * as ReactRedux from 'react-redux';
import ExistingItemComponent from '../components/ExistingItem';
import storeEditedItemDescription from '../actions/storeEditedItemDescription';

const mapStateToProps = (state, { item: { id } }) => {
  return {
    isEdited: state.editedItems.has(id),
  };
};

const mapDispatchToProps = (dispatch, { item: { id, description } }) => {
  return {
    enableEdition: () => dispatch(storeEditedItemDescription(id, description)),
  };
};

const ExistingItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExistingItemComponent);

export default ExistingItem;
