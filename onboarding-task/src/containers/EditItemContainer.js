import { connect } from 'react-redux';
import { EditItemComponent } from '../components/EditItem';
import * as ActionCreators from '../actions/actionCreators';

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) =>
    dispatch(ActionCreators.deleteItem(id)),
  onSave: (id, newText) =>
    dispatch(ActionCreators.saveChange(id, newText)),
  onCancel: (id) =>
    dispatch(ActionCreators.cancelChange(id)),
});

const EditItemContainer = connect(null, mapDispatchToProps)(EditItemComponent);
export { EditItemContainer as EditItem };
