import { connect } from 'react-redux';
import memoize from 'memoizee';

import { ListItem } from '../components/ListItem';
import { switchFormVisibilityForListItem } from '../actionCreators/actionCreators.ts';

const getListItemViewModel = (item, formDisplayed, index) => {
  return { id: item.id, text: item.text, formDisplayed, index };
};

const memoizedListItemViewModel = memoize(getListItemViewModel);

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  const formDisplayed = state.items.uiPropsById.get(id).formDisplayed;
  const item = state.items.byId.get(id);
  const index = state.items.orderedIds.indexOf(id) + 1;
  return {
    item: memoizedListItemViewModel(item, formDisplayed, index),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLabelClick: () => dispatch(switchFormVisibilityForListItem(ownProps.id)),
  };
};

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer };
