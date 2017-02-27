import { connect } from 'react-redux';

import { createListItemFactory } from '../actionCreators/actionCreators';
import CreateListItem from '../components/CreateListItem';
import guid from '../utils/guidHelper';

const createListItem = createListItemFactory(guid);

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
