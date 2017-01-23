import { ALL_ITEMS_DESCRIPTION_UPDATE } from './actionTypes';
import action from './action';

const updateItemDescription = editedItems => action(ALL_ITEMS_DESCRIPTION_UPDATE, { editedItems });

export default updateItemDescription;
