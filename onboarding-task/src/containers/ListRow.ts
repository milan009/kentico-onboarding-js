import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ListRow } from '../components/ListRow';
import {
  toggleEditItem,
  deleteItem,
  updateItem,
} from '../actions/actionCreators';
import { IAppState } from '../interfaces/state/IAppState';
import { IItem } from '../interfaces/IItem';
import { ItemUi } from '../types/ItemUi';
import { Dispatch } from '../types/Dispatch';
import { IItemViewModel } from '../interfaces/IItemViewModel';

interface IListRowOwnProps {
  id: string;
  index: number;
}

const getItemUi = (state: IAppState, props: IListRowOwnProps) => state.items.uiProperties.get(props.id);
const getItem = (state: IAppState, props: IListRowOwnProps) => state.items.byId.get(props.id);
const getIndex = (_: IAppState, props: IListRowOwnProps) => props.index;

const getItemViewModel = createSelector(
  getItem, getItemUi, getIndex,
  (item: IItem, itemUi: ItemUi, index: number) : IItemViewModel => ({
    id: item.id,
    index,
    text: item.text,
    editFormVisible: itemUi.editFormVisible,
  })
);

const mapStateToProps = (state: IAppState, props: IListRowOwnProps) => {
  return {
    item: getItemViewModel(state, props),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, { id }: IListRowOwnProps) => {
  return {
    onItemClick: () => dispatch(toggleEditItem(id)),
    onItemDelete: () => dispatch(deleteItem(id)),
    onItemUpdate: (text: string) => dispatch(updateItem(id, text)),
    onItemCancel: () => dispatch(toggleEditItem(id)),
  };
};

const ListRowContainer: ComponentClass<IListRowOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListRow);

export { ListRowContainer as ListRow };
