import { connect } from 'react-redux';

import { List } from '../components/List';
import { createListItem } from '../actionCreators/actionCreators';
import { IAppState } from '../interfaces/IAppState';
import { dispatchType } from '../utils/dispatchType';
import { fetchItems } from '../actionCreators/fetchItemsActionCreators';

const mapStateToProps = (state: IAppState) => {
  return {
    itemsOrder: state.items.orderedIds,
    isFetching: state.items.isFetching,
    error: state.items.error,
  };
};

const mapDispatchToProps = (dispatch: dispatchType) => {
  return {
    onListItemAdd: (text: string) => dispatch(createListItem(text)),
    onListMount: () => dispatch(fetchItems()),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export { ListContainer };
