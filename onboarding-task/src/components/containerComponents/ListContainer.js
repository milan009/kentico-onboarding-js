import { connect } from 'react-redux';
import { List } from '../List.jsx';
import { addItem } from '../../actionCreators/actionCreators.js';

const mapStateToProps = (state) => {
  return { lines: state.lines };
};

const mapDispatchToProps = (dispatch) => {
  return { onAddLine: (text) => dispatch(addItem(text)) };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer };
