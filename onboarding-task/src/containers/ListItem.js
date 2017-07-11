import { connect } from 'react-redux';
import memoize from 'memoizee';

import { ListItem as ListItemComponent } from '../components/ListItem';
import * as ActionCreators from '../actions/actionCreators';
import { ViewItem } from '../models/ViewItem';

const createItemRecordMemoized = memoize(({ id, index, text, isEdited }) => (
  new ViewItem({ id, index, text, isEdited })));

const mapStateToProps = (state, { id, index }) => ({
  item: createItemRecordMemoized({
    id,
    index,
    ...state.list.items.get(id).toJS(),
    ...state.list.itemInfos.get(id).toJS(),
  }),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () =>
    dispatch(ActionCreators.makeEditable(id)),
  onDelete: () =>
    dispatch(ActionCreators.deleteItem(id)),
  onSave: (newText) =>
    dispatch(ActionCreators.saveChange(id, newText)),
  onCancel: () =>
    dispatch(ActionCreators.cancelChange(id)),
});

export const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
