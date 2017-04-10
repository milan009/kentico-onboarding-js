import {Map} from 'immutable';

import {IAction} from '../actions/IAction';

import {Item} from '../models/Item';
import {ITEM_CREATED, ITEM_DELETED, ITEM_EDITED} from '../actions/actionTypes';


const itemsDataReducer = (
  state: Map<string,Item> = Map<string,Item>(),
  action: IAction,
) => {
  switch (action.type) {
    case ITEM_EDITED:
      return state.setIn([action.payload.id, 'value'], action.payload.value);

    case ITEM_CREATED:
      return state.set(action.payload.id, new Item({ id: action.payload.id, value: action.payload.value }));

    case ITEM_DELETED:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { itemsDataReducer };
