import { ITEM_DELETE } from './actionTypes';
import action from './action';

const deleteItem = id => action(ITEM_DELETE, { id });

export default deleteItem;
