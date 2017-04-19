import { connect } from 'react-redux';
import { List } from '../components/List';
import {
  deleteError,
  fetchItems,
  postItem,
} from '../actions/actionCreators';
import { Dispatch } from '../actions/Dispatch';
import { IAppState } from '../models/IAppState';


const mapStateToProps = (state: IAppState) => {
  return {
    itemsOrder: state.itemsOrder,
    loaded: state.loaded,
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch: Dispatch ) => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    onAddItem: (text: string) => dispatch(postItem(text)),
    onDeleteError: (guid: number) => dispatch(deleteError(guid)),
  };
};

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export { ListContainer as List, IAppState };
