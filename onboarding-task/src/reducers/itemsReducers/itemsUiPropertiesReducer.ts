import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_TOGGLE_EDIT, POST_ITEM_SUCCESS, GET_ITEMS_SUCCESS, DELETE_ITEM_SUCCESS, PUT_ITEM_SUCCESS,
} from '../../actions/actionTypes';
import { Map } from 'immutable';
import { ItemUi } from '../../models/ItemUi';
import { IAction } from '../../actions/IAction';
import { IItem } from '../../models/IItem';

const itemsUiPropertiesReducer = (state = Map<string, ItemUi>(), action: IAction) => {
  switch (action.type) {
    case ITEM_CREATE: {
      const newItem: ItemUi = {editFormVisible: false};
      return state.set(action.payload.id, newItem);
    }

    case ITEM_UPDATE:
    case ITEM_TOGGLE_EDIT: {
      const oldItem: ItemUi = state.get(action.payload.id);
      return state.set(action.payload.id, {...oldItem, editFormVisible: !oldItem.editFormVisible});
    }

    case ITEM_DELETE: {
      return state.delete(action.payload.id);
    }

    case POST_ITEM_SUCCESS:
    case PUT_ITEM_SUCCESS: {
      return state.set(action.payload.item.id, {editFormVisible: false});
    }

    case DELETE_ITEM_SUCCESS: {
      return state.delete(action.payload.id);
    }

    case GET_ITEMS_SUCCESS: {
      const receivedItems = action.payload.items.map((val: IItem) => [val.id, {editFormVisible: false}]);
      return state.merge(receivedItems);
    }

    default: {
      return state;
    }
  }
};

export { itemsUiPropertiesReducer };
