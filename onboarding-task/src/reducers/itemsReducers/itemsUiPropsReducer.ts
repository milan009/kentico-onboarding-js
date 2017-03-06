import { Map } from 'immutable';

import { ItemUiPropsRecord } from '../../models/ItemUiPropsRecord';
import {
  CREATE_ITEM_IN_LIST,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
  DELETE_ITEM_FROM_LIST,
} from '../../constants/actionTypes';
import { IAction } from '../../interfaces/IAction';

const itemsUiPropsReducer = (prevState = Map<string, ItemUiPropsRecord>(), action: IAction): Map<string, ItemUiPropsRecord> => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      return prevState.set(action.payload.id, new ItemUiPropsRecord());
    case SWITCH_FORM_VISIBILITY_FOR_ITEM:
      const formDisplayed = prevState.get(action.payload.id).formDisplayed;
      return prevState.setIn([action.payload.id, 'formDisplayed'], formDisplayed);
    case DELETE_ITEM_FROM_LIST:
      return prevState.delete(action.payload.id);
    default:
      return prevState;
  }
};

export { itemsUiPropsReducer };
