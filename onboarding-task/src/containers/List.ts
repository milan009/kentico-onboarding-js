import { connect } from 'react-redux';
import { Dispatch } from '../stores/Dispatch';
import { postItem } from '../actions/itemsActionCreators';
import { List } from '../components/List';
import { IAppState } from '../stores/IAppState';
import { deleteErrorMessage } from '../actions/errorMessageActionCreators';

const mapStateToProps = (state: IAppState) => {
  return {
    itemIds: state.itemsOrder,
    errorMessages: state.errorMessages,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addItem: (text: string) => dispatch(postItem(text)),
    deleteErrorMessage: (id: string) => dispatch(deleteErrorMessage(id))
  };
};

const ListContainer: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
