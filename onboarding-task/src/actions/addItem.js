import { ITEM_ADD } from './actionTypes';
import action from './action';
import Item from '../models/Item';

const addItem = description => action(
  ITEM_ADD,
  {
    item: new Item(description),
  });

export default addItem;
