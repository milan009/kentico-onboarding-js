import * as ReactRedux from 'react-redux';
import VisibleNewItem from '../components/NewItem';
import addItemAction from '../actions/addItem';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: description => dispatch(addItemAction(description)),
  };
};

const NewItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisibleNewItem);

export default NewItem;
