import Immutable from 'immutable';

import { ItemUiPropsRecord } from '../models/ItemUiPropsRecord';
import {
  CREATE_ITEM_IN_LIST,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
  DELETE_ITEM_FROM_LIST,
} from '../constants/actionTypes';

const itemsUiPropsReducer = (prevState = Immutable.Map(), action) => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      return prevState.set(action.payload.id, new ItemUiPropsRecord());
    case SWITCH_FORM_VISIBILITY_FOR_ITEM: {
      const oldUIProps = prevState.get(action.payload.id);
      const newUIProps = oldUIProps.merge(new ItemUiPropsRecord({ formDisplayed: !oldUIProps.formDisplayed }));
      return prevState.set(action.payload.id, newUIProps);
    }
    case DELETE_ITEM_FROM_LIST:
      return prevState.delete(action.payload.id);
    default:
      return prevState;
  }
};

export { itemsUiPropsReducer };
