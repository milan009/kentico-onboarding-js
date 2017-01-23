import { ITEM_ADD } from './actionTypes';
import action from './action';

const addItem = description => action(ITEM_ADD, { description });

export default addItem;
