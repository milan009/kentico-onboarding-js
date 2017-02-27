import { START_EDIT_ITEM, STOP_EDIT_ITEM } from './actionTypes.js';

function startEditItem(id) {
  return {
    type: START_EDIT_ITEM,
    payload: {
      id,
    },
  };
}

function stopEditItem(id) {
  return {
    type: STOP_EDIT_ITEM,
    payload: {
      id,
    },
  };
}

export { startEditItem, stopEditItem };
