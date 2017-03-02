import { connect } from 'react-redux';
import memoize from 'memoizee';

import { ListItem } from '../components/ListItem';

const getListItemViewModel = (item, formDisplayed) => {
  return {
    item: { id: item.id, text: item.text, formDisplayed },
  };
};

const memoizedListItemViewModel = memoize(getListItemViewModel);

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  const formDisplayed = state.items.uiPropsById.get(id).formDisplayed;
  const item = state.items.byId.get(id);
  return memoizedListItemViewModel(item, formDisplayed);
};

const ListItemContainer = connect(
  mapStateToProps,
)(ListItem);

export { ListItemContainer };
