import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actionCreators';
import { AddItem as AddItemComponent } from '../components/AddItem';

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) =>
    dispatch(ActionCreators.createItem(text)),
});

const AddItem = connect(null, mapDispatchToProps)(AddItemComponent);
export { AddItem };
