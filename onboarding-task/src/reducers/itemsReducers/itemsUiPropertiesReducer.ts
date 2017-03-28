import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT,
} from '../../actions/actionTypes';
import { Map } from 'immutable';
import { IItemUi } from '../../interfaces/IItemUi';
import { IAction } from '../../interfaces/IAction';

const itemsUiPropertiesReducer = (state = Map<string, IItemUi>(), action: IAction) => {
  switch (action.type) {
    case ITEM_CREATE: {
      const newItem: IItemUi = { editFormVisible: false };
      return state.set(action.payload.id, newItem);
    }

    case ITEM_UPDATE:
    case ITEM_TOGGLE_EDIT: {
      const oldItem: IItemUi = state.get(action.payload.id);
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
