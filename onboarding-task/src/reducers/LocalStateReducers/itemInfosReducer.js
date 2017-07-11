import * as ActionTypes from '../../actions/actionTypes';
import { itemInfoReducer } from './itemInfoReducer';
import { ItemInfo } from '../../models/ItemInfo';
import { OrderedMap } from 'immutable';

const defaultState = new OrderedMap();

export const itemInfosReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ITEM_DELETED:
      return state.remove(action.payload.id);

    case ActionTypes.ITEM_CREATED: {
      const newItem = new ItemInfo({
        isEdited: false,
      });
      return state.set(action.payload.newId, newItem);
    }

    case ActionTypes.ITEM_MAKE_EDITABLE:
    case ActionTypes.ITEM_CHANGE_CANCELLED:
    case ActionTypes.ITEM_CHANGE_SAVED: {
      const infoToEdit = state.get(action.payload.id);
      const editedInfo = itemInfoReducer(infoToEdit, action);
      return state.set(action.payload.id, editedInfo);
    }

    default:
      return state;
  }
};
