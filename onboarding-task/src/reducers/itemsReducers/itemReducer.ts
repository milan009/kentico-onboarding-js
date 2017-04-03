import {
  ITEM_CREATE,
  ITEM_UPDATE,
} from '../../actions/actionTypes';
import { Item } from '../../models/Item';
import { IAction } from '../../actions/IAction';

const itemReducer = (state = new Item(), action: IAction): Item => {
  switch (action.type) {
    case ITEM_CREATE:
      return new Item({
        id: action.payload.id,
        text: action.payload.text,
      });

    case ITEM_UPDATE:
      return state.with({ text: action.payload.text });

    default:
      return state;
  }
};

export { itemReducer };
