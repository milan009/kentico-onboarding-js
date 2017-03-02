import { connect } from 'react-redux';
import memoize from 'memoizee';

import { ListItem } from '../components/ListItem';

const getListItemViewModel = (item, formDisplayed, index) => {
  return {
    item: { id: item.id, text: item.text, formDisplayed, index },
  };
};

const memoizedListItemViewModel = memoize(getListItemViewModel);

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  const formDisplayed = state.items.uiPropsById.get(id).formDisplayed;
  const item = state.items.byId.get(id);
  const index = state.items.orderedIds.indexOf(id) + 1;
  return memoizedListItemViewModel(item, formDisplayed, index);
};

const ListItemContainer = connect(
  mapStateToProps,
)(ListItem);

export { ListItemContainer };
