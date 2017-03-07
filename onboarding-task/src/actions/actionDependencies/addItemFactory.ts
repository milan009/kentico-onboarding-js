import { ADD_ITEM } from '../actionTypes';
import {IItemAction} from "../actionCreators";

const addItem = (text: string, generateGuid: Function) => ({
  type: ADD_ITEM,
  payload: {
    guid: generateGuid(),
    text,
  },
});

export function addItemFactory(generateGuid: Function) {
  return (text: string): IItemAction => addItem(text, generateGuid);
}
