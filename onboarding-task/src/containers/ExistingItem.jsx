import * as ReactRedux from 'react-redux';
import ExistingItemComponent from '../components/ExistingItem';
import storeEditedItemDescriptionAction from '../actions/storeEditedItemDescription';

const mapStateToProps = (state, { item: { id } }) => ({
  isEdited: state.editedItems.has(id),
});

const mapDispatchToProps = (dispatch, { item: { id, description } }) => ({
  enableEdition: () => dispatch(storeEditedItemDescriptionAction(id, description, true)),
});

const ExistingItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExistingItemComponent);

export default ExistingItem;
