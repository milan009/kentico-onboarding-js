import { ITEM_CANCEL_EDITION } from './actionTypes';
import action from './action';

const cancelItemEdition = id => action(ITEM_CANCEL_EDITION, { id });

export default cancelItemEdition;
