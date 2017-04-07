import { connect } from 'react-redux';
import memoize = require('memoizee');

import { ListItem, IListItemDataProps, IListItemCallbacksProps } from '../components/ListItem';
import { switchFormVisibilityForListItem } from '../actionCreators/actionCreators';
import { ItemRecord } from '../models/ItemRecord';
import { IAppState } from '../interfaces/IAppState';
import { IItemViewModel } from '../interfaces/IItemViewModel';
import { dispatchType } from '../utils/dispatchType';

const getListItemViewModel = (item: ItemRecord, formDisplayed: boolean, index: number, savedOnServer: boolean): IItemViewModel => {
  return { id: item.id, text: item.text, formDisplayed, index, savedOnServer };
};

const memoizedListItemViewModel = memoize(getListItemViewModel);

interface IOwnProps {
  readonly id: string;
}

const mapStateToProps = (state: IAppState, ownProps: IOwnProps): IListItemDataProps => {
  const id = ownProps.id;
  const itemUiProps = state.items.uiPropsById.get(id);
  const item = state.items.byId.get(id);
  const index = state.items.orderedIds.indexOf(id) + 1;
  return {
    item: memoizedListItemViewModel(item, itemUiProps.formDisplayed, index, itemUiProps.savedOnServer),
  };
};

const mapDispatchToProps = (dispatch: dispatchType, ownProps: IOwnProps): IListItemCallbacksProps => {
  return {
    onLabelClick: () => dispatch(switchFormVisibilityForListItem(ownProps.id)),
  };
};

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer, memoizedListItemViewModel as getMemoizedListItemViewModel };
