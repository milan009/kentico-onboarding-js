import { getItems } from './itemsReducer';

export function app(state = { }, action) {
  return {
    items: getItems(state.items, action),
  };
}
