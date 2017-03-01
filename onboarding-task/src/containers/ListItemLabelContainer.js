import { connect } from 'react-redux';

import { switchFormVisibilityForListItem } from '../actionCreators/actionCreators';
import { ListItemLabel } from '../components/ListItemLabel';

const mapStateToProps = (state, ownProps) => {
  return {
    text: ownProps.item.text,
    index: state.items.orderedIds.indexOf(ownProps.item.id) + 1,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(switchFormVisibilityForListItem(ownProps.item.id)),
  };
};

const ListItemLabelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemLabel);

export { ListItemLabelContainer };
