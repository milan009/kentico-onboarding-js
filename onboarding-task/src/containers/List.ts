import { connect } from 'react-redux';
import { List } from '../components/List';
import { OrderedSet } from 'immutable';
import { IAppState } from '../reducers/IAppState';
import { createSelector } from 'reselect';
import { postItem } from '../actions/actionCreatorsPost';
import { dismissError } from '../actions/actionCreatorsErrors';

const getItemIds = (state: IAppState) => OrderedSet.fromKeys(state.items.byId);

const getListViewModel = createSelector(
  getItemIds,
  (itemIds: OrderedSet<string>) => itemIds
);

const mapStateToProps = (state: IAppState) => {
  return {
    itemIds: getListViewModel(state),
    isFetching: state.items.isFetching,
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onItemAdd: (text: string) => dispatch(postItem(text)),
    onDismissError: (key: string) => dispatch(dismissError(key)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
