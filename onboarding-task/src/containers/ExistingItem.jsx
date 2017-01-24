import * as ReactRedux from 'react-redux';
import ExistingItemComponent from '../components/ExistingItem';
import storeEditedItemDescription from '../actions/storeEditedItemDescription';

const mapStateToProps = (state, { item: { id } }) => ({
  isEdited: state.editedItems.getIn([id, 'isEdited'], false),
});

const mapDispatchToProps = (dispatch, { item: { id, description } }) => ({
  enableEdition: () => dispatch(storeEditedItemDescription(id, description, true)),
});

const ExistingItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExistingItemComponent);

export default ExistingItem;
