import { connect } from 'react-redux';

import { updateListItem, switchFormVisibilityForListItem, deleteListItem } from '../actionCreators/actionCreators';
import { ListItemForm } from '../components/ListItemForm';

const mapStateToProps = (state, ownProps) => {
  return {
    inputValue: ownProps.item.text,
    index: ownProps.item.index,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFormSubmit: (text) => {
      dispatch(updateListItem(ownProps.item.id, text));
      dispatch(switchFormVisibilityForListItem(ownProps.item.id));
    },
    onFormCancelClick: () => dispatch(switchFormVisibilityForListItem(ownProps.item.id)),
    onFormDeleteClick: () => dispatch(deleteListItem(ownProps.item.id)),
  };
};

const ListItemFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemForm);

export { ListItemFormContainer };
