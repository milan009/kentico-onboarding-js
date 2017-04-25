/**
 * Created by VlastimilM on 25.4.2017.
 */
import { connect } from 'react-redux';
import { addItem } from '../actions/actionCreators';
import { ItemForm } from '../components/CreateItemForm';

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => dispatch(addItem(text)),
  };
};

const createItemFormContainer = connect(undefined, mapDispatchToProps)(ItemForm);

export { createItemFormContainer as ItemForm };
