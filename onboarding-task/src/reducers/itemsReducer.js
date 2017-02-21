import Immutable from 'immutable';

import { UPDATE_ITEM, SWITCH_FORM_VISIBILITY_FOR_ITEM, ADD_ITEM_TO_LIST, DELETE_ITEM_FROM_LIST } from '../actionTypes';
import guid from '../utils/guidHelper';
import { ItemRecord } from '../models/ItemRecord';

const itemsReducer = (prevState = new Immutable.Map(), action) => {
  switch (action.type) {
    case ADD_ITEM_TO_LIST: {
      const newItem = new ItemRecord({ id: action.id, text: action.text, formDisplayed: false });
      return prevState.set(action.id, newItem);
    }
    case UPDATE_ITEM: {
      const item = prevState.get(action.id);
      const updatedItem = item.merge({ text: action.text });
      return prevState.set(action.id, updatedItem);
    }
    case SWITCH_FORM_VISIBILITY_FOR_ITEM: {
      const item = prevState.get(action.id);
      const updatedItem = item.merge({ formDisplayed: !item.formDisplayed });
      return prevState.set(action.id, updatedItem);
    }
    case DELETE_ITEM_FROM_LIST: {
      return prevState.delete(action.id);
    }
    default:
      return prevState;
  }
};

export { itemsReducer };
