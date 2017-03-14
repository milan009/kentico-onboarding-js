import { IItemAction } from '../reducers/item';
const { connect } = require('react-redux');
import { List as ListComponent } from '../components/List';
import * as Immutable from 'immutable';
import { IItemFlags } from '../reducers/itemsFlags';
import { IItemRecord } from '../reducers/item';
import {Dispatch} from 'react-redux';
import { addItem } from '../actions/actionCreators';

interface IListState {
  itemsOrder: Immutable.OrderedSet<string>;
  itemsFlags: Immutable.Map<string, IItemFlags>;
  itemsById: Immutable.Map<string, IItemRecord>;
}

const mapStateToProps = (state: IListState) => {
  return {
    itemsOrder: state.itemsOrder,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<(itemAction: IItemAction) => IItemAction> ) => {
  return {
    onAddItem: (text: string) => dispatch(addItem(text)),
  };
};

const List = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

export { List, IListState };

