import { connect } from 'react-redux';
import { List } from '../components/List.jsx';
import { addItem } from '../actionCreators/actionCreators.js';

const mapStateToProps = (state) => {
  return { items: state.items };
};

const mapDispatchToProps = (dispatch) => {
  return { onAddLine: (text) => dispatch(addItem(text)) };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer };
