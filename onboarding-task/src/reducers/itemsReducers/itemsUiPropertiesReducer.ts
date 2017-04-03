import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from '../../actions/actionTypes';
import { Map } from 'immutable';
import { ItemUi } from '../../types/ItemUi';
import { IAction } from '../../interfaces/state/IAction';

const itemsUiPropertiesReducer = (state = Map<string, ItemUi>(), action: IAction) => {
  switch (action.type) {
    case ITEM_CREATE: {
      const newItem: ItemUi = { editFormVisible: false };
      return state.set(action.payload.id, newItem);
    }

    case ITEM_UPDATE:
    case ITEM_TOGGLE_EDIT: {
      const oldItem: ItemUi = state.get(action.payload.id);
      return state.set(action.payload.id, { ...oldItem, editFormVisible: !oldItem.editFormVisible });
    }

    case ITEM_DELETE: {
      return state.delete(action.payload.id);
    }

    default: {
      return state;
    }
  }
};

export { itemsUiPropertiesReducer };
