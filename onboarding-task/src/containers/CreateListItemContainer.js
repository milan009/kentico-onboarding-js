import { connect } from 'react-redux';

import { createListItem } from '../actionCreators/actionCreators';
import CreateListItem from '../components/CreateListItem';

const mapDispatchToProps = (dispatch) => {
  return {
    onListItemAdd: (text) => dispatch(createListItem(text)),
  };
};

const CreateListItemContainer = connect(
  null,
  mapDispatchToProps
)(CreateListItem);

export { CreateListItemContainer };
