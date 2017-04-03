import { connect } from 'react-redux';
import { List } from '../components/List';
import { createItem } from '../actions/actionCreators';
import { OrderedSet } from 'immutable';
import { IAppState } from '../reducers/IAppState';
import { Dispatch } from '../types/Dispatch';
import { createSelector } from 'reselect';

const getItemIds = (state: IAppState) => OrderedSet.fromKeys(state.items.byId);

const getListViewModel = createSelector(
  getItemIds,
  (itemIds: OrderedSet<string>) => itemIds
);

const mapStateToProps = (state: IAppState) => {
  return { itemIds: getListViewModel(state) };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onItemAdd: (text: string) => dispatch(createItem(text)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
