import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ListRow } from '../components/ListRow.jsx';
import {
  toggleEditItem,
  deleteItem,
  updateItem,
} from '../actions/actionCreators.js';

const getItemUi = (state, props) => state.items.uiProperties.get(props.id);
const getItem = (state, props) => state.items.byId.get(props.id);
const getIndex = (state, props) => props.index;

const getItemViewModel = createSelector(
  [getItem, getItemUi, getIndex],
  (item, itemUi, index) => ({
    id: item.id,
    index,
    text: item.text,
    editing: itemUi.editFormVisible,
  })
);

const mapStateToProps = (state, props) => {
  return {
    item: getItemViewModel(state, props),
  };
};

const mapDispatchToProps = (dispatch, { id }) => {
  return {
    onItemClick: () => dispatch(toggleEditItem(id)),
    onItemDelete: () => dispatch(deleteItem(id)),
    onItemUpdate: (text) => dispatch(updateItem(id, text)),
    onItemCancel: () => dispatch(toggleEditItem(id)),
  };
};

const ListRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListRow);

export { ListRowContainer as ListRow };
