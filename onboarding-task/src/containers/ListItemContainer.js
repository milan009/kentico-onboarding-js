import { connect } from 'react-redux';

import { ListItem } from '../components/ListItem';

const mapStateToProps = (state, ownProps) => {
  const item = state.items.byId.get(ownProps.id);
  const formDisplayed = state.items.uiPropsById.get(item.id).formDisplayed;
  return {
    item: { id: item.id, text: item.text, formDisplayed },
  };
};

const ListItemContainer = connect(
  mapStateToProps,
)(ListItem);

export { ListItemContainer };
