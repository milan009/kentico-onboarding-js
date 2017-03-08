import { connect } from 'react-redux';
import memoize = require('memoizee');

import { ListItem } from '../components/ListItem';
import { switchFormVisibilityForListItem } from '../actionCreators/actionCreators';
import { ItemRecord } from '../models/ItemRecord';
import { IAction } from '../interfaces/IAction';
import { IAppState } from '../interfaces/IAppState';
import { IItemViewModel } from '../interfaces/IItemViewModel';

const getListItemViewModel = (item: ItemRecord, formDisplayed: boolean, index: number): IItemViewModel => {
  return { id: item.id, text: item.text, formDisplayed, index };
};

const memoizedListItemViewModel = memoize(getListItemViewModel);

interface IOwnProps {
  id: string;
}

const mapStateToProps = (state: IAppState, ownProps: IOwnProps) => {
  const id = ownProps.id;
  const formDisplayed = state.items.uiPropsById.get(id).formDisplayed;
  const item = state.items.byId.get(id);
  const index = state.items.orderedIds.indexOf(id) + 1;
  return {
    item: memoizedListItemViewModel(item, formDisplayed, index),
  };
};

type dispatchType = (action: IAction) => IAction;

const mapDispatchToProps = (dispatch: dispatchType, ownProps: IOwnProps) => {
  return {
    onLabelClick: () => dispatch(switchFormVisibilityForListItem(ownProps.id)),
  };
};

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer, memoizedListItemViewModel as getMemoizedListItemViewModel };
