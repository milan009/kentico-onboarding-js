import * as ReactRedux from 'react-redux';
import NewItemComponent from '../components/NewItem';
import addItemAction from '../actions/addItem';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: description => dispatch(addItemAction(description)),
  };
};

const NewItem = ReactRedux.connect(
  undefined,
  mapDispatchToProps,
)(NewItemComponent);

export default NewItem;
