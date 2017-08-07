import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import { ViewItem } from '../models/ViewItem';
import {
  cancelChange,
  deleteItem,
  makeEditable,
  saveChange,
} from '../actions/actionCreators';

const mapStateToProps = (state, { id, index }) => ({
  item: new ViewItem(
    index,
    state.list.itemsById.get(id),
    state.list.itemFlagsMap.get(id),
  ),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () =>
    dispatch(makeEditable(id)),
  onDelete: () =>
    dispatch(deleteItem(id)),
  onSave: (newText) =>
    dispatch(saveChange(id, newText)),
  onCancel: () =>
    dispatch(cancelChange(id)),
});

export const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
