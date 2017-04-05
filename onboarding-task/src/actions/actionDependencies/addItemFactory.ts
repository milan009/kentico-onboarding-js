import { ADD_ITEM } from '../actionTypes';
import { IAction } from '../IAction';

const addItem = (text: string, generateGuid: () => string ): IAction => ({
  type: ADD_ITEM,
  payload: {
    guid: generateGuid(),
    text,
  },
});

export function addItemFactory(generateGuid: () => string): (text: string) => IAction {
  return (text: string): IAction => addItem(text, generateGuid);
}
