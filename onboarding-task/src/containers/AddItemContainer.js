import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actionCreators';
import { AddItemComponent } from '../components/AddItem';

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) =>
    dispatch(ActionCreators.createItem(text)),
});

const AddItemContainer = connect(null, mapDispatchToProps)(AddItemComponent);
export { AddItemContainer as AddItem };
