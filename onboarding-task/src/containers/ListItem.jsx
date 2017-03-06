import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { toggleEditMode, updateItemText, deleteItem } from '../actions/actionCreators.js';
import { selectViewItem } from '../selectors/selectViewItems';


const mapStateToProps = (state, ownProps) => {
  return {
    item: selectViewItem(state, ownProps.guid),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleEditMode: (guid) => dispatch(toggleEditMode(guid)),
    onUpdateText: (guid, text) => dispatch(updateItemText(guid, text)),
    onDelete: (guid) => dispatch(deleteItem(guid)),
  };
};

const ListItem = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);

export { ListItem };

