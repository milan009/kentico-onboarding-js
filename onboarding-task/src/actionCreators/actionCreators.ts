import {
  DELETE_ITEM_FROM_LIST,
  UPDATE_TEXT_OF_ITEM,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
} from '../constants/actionTypes';
import { createListItemFactory } from './createListItemFactory';
import { createGuid } from '../utils/guidHelper';
import { IAction } from '../interfaces/IAction';
import { sendItem } from './sendItemActionCreators';

export const createListItem = createListItemFactory(createGuid, sendItem);

export const switchFormVisibilityForListItem = (id: string): IAction => {
  return {
    type: SWITCH_FORM_VISIBILITY_FOR_ITEM,
    payload: {
      id,
    },
  };
};

export const updateListItem = (id: string, text: string): IAction => {
  return {
    type: UPDATE_TEXT_OF_ITEM,
    payload: {
      text,
      id,
    },
  };
};

export const deleteListItem = (id: string): IAction => {
  return {
    type: DELETE_ITEM_FROM_LIST,
    payload: {
      id,
    },
  };
};
