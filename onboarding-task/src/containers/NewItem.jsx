import * as ReactRedux from 'react-redux';
import NewItemComponent from '../components/NewItem';
import addItemAction from '../actions/addItem';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onSubmit: description => dispatch(addItemAction(description)),
});

const NewItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewItemComponent);

export default NewItem;
