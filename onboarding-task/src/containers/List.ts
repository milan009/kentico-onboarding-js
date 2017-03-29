import { connect } from 'react-redux';
import { List } from '../components/List';
import { createItem } from '../actions/actionCreators';
import { OrderedSet } from 'immutable';
import { IAppState } from '../interfaces/IAppState';
import { IDispatchType } from '../interfaces/IDispatchType';

const mapStateToProps = (state: IAppState) => {
  return { itemIds: OrderedSet.fromKeys(state.items.byId) };
};

const mapDispatchToProps = (dispatch: IDispatchType) => {
  return {
    onItemAdd: (text: string) => dispatch(createItem(text)),
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
