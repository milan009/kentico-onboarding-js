import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';

import { List } from '../components/List';
import { Dispatch } from 'redux';
import { IAppState } from '../stores/IAppState';
import { createItem, deleteItem, editItem, toggleItemViewMode } from '../actions/actionCreators';
import { IAction } from '../stores/IAction';


interface IListContainerProps {
  itemsOrder: Immutable.OrderedSet<string>;
}

function mapStateToProps(state: IAppState): IListContainerProps {
  return {
      itemsOrder: state.itemsOrder,
  };
}


function mapDispatchToProps(dispatch: Dispatch<IAction>) {
  return {
    onAddItem: (value: string) => dispatch(createItem(value)),
    onEditItemValue: (id: string, value: string) => dispatch(editItem(id, value)),
    onDeleteItem: (id: string) => dispatch(deleteItem(id)),
    onToggleItemViewMode: (id: string) => dispatch(toggleItemViewMode(id))
  };
}

const ListContainer: React.ComponentClass<undefined> = connect(mapStateToProps, mapDispatchToProps)(List);

export { ListContainer as List };
