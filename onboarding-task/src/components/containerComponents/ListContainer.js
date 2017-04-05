import { connect } from 'react-redux';
import { List } from '../List.jsx';
import { addItem, editItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../../actionCreators/actionCreators.js';

const mapStateToProps = (state) => {
  return { lines: state.lines };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddLine: (text) => dispatch(addItem(text)),

    onDeleteLine: (id) => dispatch(deleteItem(id)),

    onDoubleClick: (id) => dispatch(editItem(id)),

    onClickSave: (id, text) => dispatch(saveChangesToItem(id, text)),

    onClickCancel: (id) => dispatch(cancelChangesToItem(id)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer };
