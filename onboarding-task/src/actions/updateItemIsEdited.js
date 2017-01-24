import { ITEM_UPDATE_IS_EDITED } from './actionTypes';
import EditedItem from '../models/EditedItem';
import action from './action';


const updateItemIsEdited = (id, isEdited) => action(
  ITEM_UPDATE_IS_EDITED,
  {
    id,
    editedItem: new EditedItem({ isEdited }),
  });

export default updateItemIsEdited;
