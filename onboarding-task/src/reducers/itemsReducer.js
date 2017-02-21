import Immutable from 'immutable';

import { UPDATE_ITEM, SWITCH_FORM_VISIBILITY_FOR_ITEM, ADD_ITEM_TO_LIST, DELETE_ITEM_FROM_LIST } from '../actionTypes';
import guid from '../utils/guidHelper';
import { ItemRecord } from '../models/ItemRecord';

const itemsReducer = (prevState = new Immutable.List(), action) => {
  switch (action.type) {
    case ADD_ITEM_TO_LIST: {
      const id = guid();
      const newItem = new ItemRecord({ id, text: action.text, formDisplayed: false });
      return prevState.items.set(id, newItem);
    }
    case UPDATE_ITEM: {
      const item = prevState.items.get(action.id);
      const updatedItem = item.merge({ formDisplayed: false, text: action.text });
      return prevState.items.set(action.id, updatedItem);
    }
    case SWITCH_FORM_VISIBILITY_FOR_ITEM: {
      const item = prevState.items.get(action.id);
      const updatedItem = item.merge({ formDisplayed: !item.formDisplayed });
      return prevState.items.set(action.id, updatedItem);
    }
    case DELETE_ITEM_FROM_LIST: {
      return prevState.items.delete(action.id);
    }
    default:
      return prevState;
  }
};

export { itemsReducer };
