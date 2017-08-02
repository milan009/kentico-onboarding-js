import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import * as actionCreators from '../actions/actionCreators.ts';
import { ViewItem } from '../models/ViewItem';

const mapStateToProps = (state, { id, index }) => ({
  item: new ViewItem(
    id,
    index,
    state.list.itemsById.get(id),
    state.list.itemFlagsMap.get(id),
  ),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () =>
    dispatch(actionCreators.makeEditable(id)),
  onDelete: () =>
    dispatch(actionCreators.deleteItem(id)),
  onSave: (newText) =>
    dispatch(actionCreators.saveChange(id, newText)),
  onCancel: () =>
    dispatch(actionCreators.cancelChange(id)),
});

export const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
