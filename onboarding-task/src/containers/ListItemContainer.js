import { connect } from 'react-redux';

import { ListItem } from '../components/ListItem';

const mapStateToProps = (state, ownProps) => {
  return {
    item: { id: ownProps.item.id, text: ownProps.item.text, formDisplayed: state.items.uiPropsById.get(ownProps.item.id).formDisplayed },
  };
};

const ListItemContainer = connect(
  mapStateToProps,
)(ListItem);

export { ListItemContainer };
