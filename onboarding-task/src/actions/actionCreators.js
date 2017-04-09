import { ITEM_ADDED, ITEM_DELETED, ITEM_SAVED, START_EDITING_ITEM, STOP_EDITING_ITEM } from './actionTypes';
import { generatePseudoUniqueID } from '../utils/keyGenerator';
const addItem = (text) => (
  {
    type: ITEM_ADDED,
    text,
    id: generatePseudoUniqueID(),
  }
);

const saveItem = (id, text) => (
  {
    type: ITEM_SAVED,
    id,
    text,
  }
);

const deleteItem = (id) => (
  {
    type: ITEM_DELETED,
    id,
  }
);

const startEditingItem = (id) => (
  {
    type: START_EDITING_ITEM,
    id,
  }
);

const stopEditingItem = (id) => (
  {
    type: STOP_EDITING_ITEM,
    id,
  }
);

