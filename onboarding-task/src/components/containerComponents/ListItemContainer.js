import { connect } from 'react-redux';
import { ListItem } from '../ListItem.jsx';
import { editItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../../actionCreators/actionCreators.js';


const mapStateToProps = (state, props) => {
  return { line: props.line };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    index: props.index,

    onDelete: (id) => dispatch(deleteItem(id)),

    onDoubleClick: (id) => dispatch(editItem(id)),

    onSave: (id, text) => dispatch(saveChangesToItem(id, text)),

    onCancel: (id) => dispatch(cancelChangesToItem(id)),
  };
};

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer };
