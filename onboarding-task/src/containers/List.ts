import { connect } from 'react-redux';
import { Dispatch } from '../stores/Dispatch';
import { fetchItems, postItem } from '../actions/itemsActionCreators';
import { List } from '../components/List';
import { IAppState } from '../stores/IAppState';

const mapStateToProps = (state: IAppState) => {
  return {
    itemIds: state.itemsOrder,
    isFetching: state.isFetching,
    errorMessage: state.errorMessage,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addItem: (text: string) => dispatch(postItem(text)),
    fetchItems: () => dispatch(fetchItems)
  };
};

const ListContainer: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
