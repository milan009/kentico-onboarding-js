import { connect } from 'react-redux';
import { List } from '../components/List';
import * as Immutable from 'immutable';
import { IItemFlags } from '../reducers/itemsFlags';
import { IItemRecord } from '../utils/itemRecord';
import { addItem } from '../actions/actionCreators';
import { Dispatch } from '../actions/Dispatch';


interface IListState {
  itemsById: Immutable.Map<string, IItemRecord>;
  itemsFlags: Immutable.Map<string, IItemFlags>;
  itemsOrder: Immutable.OrderedSet<string>;
}

const mapStateToProps = (state: IListState) => {
  return {
    itemsOrder: state.itemsOrder,
  };
};

const mapDispatchToProps = (dispatch: Dispatch ) => {
  return {
    onAddItem: (text: string) => dispatch(addItem(text)),
  };
};

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export { ListContainer as List, IListState };

