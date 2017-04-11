import { connect } from 'react-redux';
import { List } from '../components/List.jsx';
import { addItem } from '../actionCreators/actionCreators.js';

const mapStateToProps = (state) => ({
  itemIds: state.itemIds,
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) => dispatch(addItem(text)),
});


const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer };
