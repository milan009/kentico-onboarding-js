import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { addItem } from '../actions/actionCreators.ts';

const mapStateToProps = (state) => {
  return {
    itemsOrder: state.itemsOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddItem: (text) => dispatch(addItem(text)),
  };
};

const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

export { List };

