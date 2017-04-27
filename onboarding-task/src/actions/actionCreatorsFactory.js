import { ITEM_ADDED } from './actionTypes';

export const addItemFactory = (guidFunction) => (text) => (
  {
    type: ITEM_ADDED,
    payload: {
      text,
      id: guidFunction(),
    },
  }
);
