import { connect } from 'react-redux';

import { switchFormVisibilityForListItem } from '../actionCreators/actionCreators';
import { ListItemLabel } from '../components/ListItemLabel';

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.items.get(ownProps.id).text,
    index: state.itemsOrder.indexOf(ownProps.id) + 1,
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
