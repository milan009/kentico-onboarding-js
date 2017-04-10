import {DELETE_ITEM, FETCH_ITEMS_SUCCESS, POST_ITEM_SUCCESS} from '../actions/actionTypes';
import { IAction } from '../actions/IAction';
import { OrderedSet } from 'immutable';
import {IItemServerModel} from '../models/IItemServerModel';

const emptyItemsOrder = OrderedSet<string>();
function itemsOrder (state: OrderedSet<string> = emptyItemsOrder, action: IAction): OrderedSet<string> {
  switch (action.type) {
    // case ADD_ITEM:
    //   return state.add(action.payload.guid);

    case DELETE_ITEM:
      return state.remove(action.payload.guid);

    case FETCH_ITEMS_SUCCESS:
      const items = action.payload.items;
      const itemsArray: Array<string> = [];
      items.map( (currentItem: IItemServerModel) => {
          itemsArray.push(currentItem.id);
        }
      );
      return OrderedSet<string>(itemsArray);

    case POST_ITEM_SUCCESS:
      return state.add(action.payload.item.id);

    default:
      return state;
  }
}

export { itemsOrder };
