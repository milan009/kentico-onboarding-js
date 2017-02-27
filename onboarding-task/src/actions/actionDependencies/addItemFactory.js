/**
 * Created by IvanJ on 27.2.2017.
 */
import { ADD_ITEM } from '../actionTypes.js';

const addItem = (text, guidGenerator) => ({
  type: ADD_ITEM,
  payload: {
    guid: guidGenerator(),
    isEdited: false,
    text,
  },
});

export function addItemFactory(guidGenerator) {
  return (text) => addItem(text, guidGenerator);
}
