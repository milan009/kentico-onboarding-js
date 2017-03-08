import { ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes';
import { IItemAction } from '../actions/actionCreators';
import { List } from 'immutable';


const list: List<string> = List([]);
const itemsOrder = (state: List<string> = list, action: IItemAction) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.push(action.payload.guid);
    case DELETE_ITEM:
      const index: number = state.indexOf(action.payload.guid);
      return state.splice(index, 1);
    default:
      return state;
  }
};

export { itemsOrder };
