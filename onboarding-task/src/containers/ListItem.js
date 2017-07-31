import { connect } from 'react-redux';
import memoize from 'memoizee';

import { ListItem as ListItemComponent } from '../components/ListItem';
import * as actionCreators from '../actions/actionCreators';
import { ViewItem } from '../models/ViewItem';

const createItemRecordMemoized = memoize(({ id, index, text, isBeingEdited }) => (
  new ViewItem({
    id,
    index,
    text,
    isBeingEdited,
  })));

const mapStateToProps = (state, { id, index }) => ({
  item: createItemRecordMemoized({
    id,
    index,
    ...state.list.items.get(id).toJS(),
    ...state.list.itemFlagsMap.get(id).toJS(),
  }),
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
