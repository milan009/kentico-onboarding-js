import { connect } from 'react-redux';
import { addItem, fetchItems} from '../actions/itemsActionCreators';
import { List } from '../components/List';
import { IAppState } from '../stores/IAppState';

const mapStateToProps = (state: IAppState) => {
  return {
    itemIds: state.itemsOrder,
    isFetching: state.isFetching,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addItem: (text: string) => dispatch(addItem(text)),
    fetchItems: () => dispatch(fetchItems())
  };
};

const ListContainer: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
