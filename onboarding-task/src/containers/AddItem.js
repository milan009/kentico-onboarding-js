import { connect } from 'react-redux';

import { createItem } from '../actions/actionCreators';
import { AddItem as AddItemComponent } from '../components/AddItem';

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) => dispatch(createItem(text)),
});

const AddItem = connect(null, mapDispatchToProps)(AddItemComponent);
export { AddItem };
