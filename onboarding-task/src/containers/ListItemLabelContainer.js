import { connect } from 'react-redux';

import { switchFormVisibilityForListItem } from '../actionCreators/actionCreators';
import { ListItemLabel } from '../components/ListItemLabel';

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.items.byId.get(ownProps.id).text,
    index: state.items.orderedIds.indexOf(ownProps.id) + 1,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickHandler: () => dispatch(switchFormVisibilityForListItem(ownProps.id)),
  };
};

const ListItemLabelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemLabel);

export { ListItemLabelContainer };
