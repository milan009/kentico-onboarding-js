import { ADD_ITEM } from '../actionTypes';
import { IItemAction } from '../../reducers/item';

const addItem = (text: string, generateGuid: () => string ): IItemAction => ({
  type: ADD_ITEM,
  payload: {
    guid: generateGuid(),
    text,
  },
});

export function addItemFactory(generateGuid: () => string): (text: string) => IItemAction {
  return (text: string): IItemAction => addItem(text, generateGuid);
}
