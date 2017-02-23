import { connect } from 'react-redux';

import { updateListItem, switchFormVisibilityForListItem, deleteListItem } from '../actionCreators/actionCreators';
import ListItemForm from '../components/ListItemForm';

const mapStateToProps = (state, ownProps) => {
  return {
    inputValue: state.items.get(ownProps.id).text,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFormSubmit: (text) => {
      dispatch(updateListItem(ownProps.id, text));
      dispatch(switchFormVisibilityForListItem(ownProps.id));
    },
    onFormCancelClick: () => dispatch(switchFormVisibilityForListItem(ownProps.id)),
    onFormDeleteClick: () => dispatch(deleteListItem(ownProps.id)),
  };
};

const ListItemFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemForm);

export { ListItemFormContainer };
