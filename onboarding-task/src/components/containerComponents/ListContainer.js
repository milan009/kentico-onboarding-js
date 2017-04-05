import { connect } from 'react-redux';
import { List } from '../List.jsx';
import { addItem, editItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../../actionCreators/actionCreators.js';

const mapStateToProps = (state) => {
  return { lines: state.lines };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _handleAddLine: (text) => dispatch(addItem(text)),

    _handleDeleteLine: (id) => dispatch(deleteItem(id)),

    _handleDoubleClick: (id) => dispatch(editItem(id)),

    _handleClickSave: (id, text) => dispatch(saveChangesToItem(id, text)),

    _handleClickCancel: (id) => dispatch(cancelChangesToItem(id)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer };
