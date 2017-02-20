import { Set } from 'immutable';
import { START_EDIT_ITEM, STOP_EDIT_ITEM} from '../actions/actionTypes.js';

const areEditable = (state = Set(), action) => {
  switch (action.type) {
    case START_EDIT_ITEM:
      return state.add(action.payload.id);

    case STOP_EDIT_ITEM:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { areEditable };
