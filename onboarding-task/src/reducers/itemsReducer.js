import Immutable from 'immutable';

import { UPDATE_ITEM, SWITCH_FORM_VISIBILITY_FOR_ITEM, ADD_ITEM_TO_LIST, DELETE_ITEM_FROM_LIST } from '../constants/actionTypes';
import { ItemRecord } from '../models/ItemRecord';

const itemsReducer = (prevState = new Immutable.Map(), action) => {
  switch (action.type) {
    case ADD_ITEM_TO_LIST: {
      const newItem = new ItemRecord({ id: action.payload.id, text: action.payload.text, formDisplayed: false });
      return prevState.set(action.payload.id, newItem);
    }
    case UPDATE_ITEM: {
      const item = prevState.get(action.payload.id);
      const updatedItem = item.merge({ text: action.payload.text });
      return prevState.set(action.payload.id, updatedItem);
    }
    case SWITCH_FORM_VISIBILITY_FOR_ITEM: {
      const item = prevState.get(action.payload.id);
      const updatedItem = item.merge({ formDisplayed: !item.formDisplayed });
      return prevState.set(action.payload.id, updatedItem);
    }
    case DELETE_ITEM_FROM_LIST: {
      return prevState.delete(action.payload.id);
    }
    default:
      return prevState;
  }
};

export { itemsReducer };
