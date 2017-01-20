import { ITEM_UPDATE_IS_EDITED } from './actionTypes';
import action from './action';

const updateItemIsEdited = (id, isEdited) => action(
  ITEM_UPDATE_IS_EDITED,
  {
    id,
    isEdited,
  });

export default updateItemIsEdited;
