import { Map } from 'immutable';

import { IAction } from '../actions/IAction';
import { Item } from '../models/Item';
import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM } from '../actions/actionTypes';

const itemsDataReducer = (state = Map<string, Item>(),
                          action: IAction,) => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.setIn([action.payload.id, 'value'], action.payload.value);

    case CREATE_ITEM:
      return state.set(action.payload.id, new Item({ id: action.payload.id, value: action.payload.value }));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { itemsDataReducer };
