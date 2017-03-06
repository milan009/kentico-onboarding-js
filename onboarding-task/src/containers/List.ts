const { connect } = require('react-redux');
import {Dispatch} from 'redux';

import { addItem, deleteItem, updateItem } from '../actions/itemsActionCreators';
import { startEditItem, stopEditItem } from '../actions/editedItemsActionCreators';
import { List } from '../components/List';
import { getViewItems } from '../selectors/getViewItems';
import { IAppState } from '../stores/IAppState';
import { IAction } from '../actions/IAction';

const mapStateToProps = (state: IAppState) => {
  return {
    list: getViewItems(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    addItem: (text: string) => dispatch(addItem(text)),
    deleteItem: (id: string) => dispatch(deleteItem(id)),
    updateItem: (id: string, text: string) => dispatch(updateItem(id, text)),
    startEditingItem: (id: string) => dispatch(startEditItem(id)),
    stopEditingItem: (id: string) => dispatch(stopEditItem(id)),
  };
};

const ListContainer: React.ComponentClass<undefined> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
