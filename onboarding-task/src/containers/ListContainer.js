import { connect } from 'react-redux';
import { List } from '../components/List.jsx';
import { addItem } from '../actionCreators/actionCreators.js';

const mapStateToProps = (state) => ({
  itemIDs: state.itemIDs,
});

const mapDispatchToProps = (dispatch) => ({
  onAddLine: (text) => dispatch(addItem(text)),
});


const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer };
