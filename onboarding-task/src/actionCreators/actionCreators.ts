import {
  DELETE_ITEM_FROM_LIST,
  UPDATE_TEXT_OF_ITEM,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
} from '../constants/actionTypes';
import { createListItemFactory } from './createListItemFactory';
import { createGuid } from '../utils/guidHelper';

interface IActionWithIdAndText {
  type: string;
  payload: { id: string; text: string };
}

interface IActionWithId {
  type: string;
  payload: { id: string };
}

export const createListItem = createListItemFactory(createGuid);

export const switchFormVisibilityForListItem = (id: string): IActionWithId => {
  return {
    type: SWITCH_FORM_VISIBILITY_FOR_ITEM,
    payload: {
      id,
    },
  };
};

export const updateListItem = (id: string, text: string): IActionWithIdAndText => {
  return {
    type: UPDATE_TEXT_OF_ITEM,
    payload: {
      text,
      id,
    },
  };
};

export const deleteListItem = (id: string): IActionWithId => {
  return {
    type: DELETE_ITEM_FROM_LIST,
    payload: {
      id,
    },
  };
};
