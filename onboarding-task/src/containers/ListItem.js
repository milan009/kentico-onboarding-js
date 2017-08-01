import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import * as actionCreators from '../actions/actionCreators';
import { ViewItem } from '../models/ViewItem';

const mapStateToProps = (state, { id, index }) => ({
  item: new ViewItem(
    id,
    index,
    state.items.itemsById.get(id),
    state.items.itemFlagsMap.get(id),
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
