import { ITEM_STORE_EDITED_DESCRIPTION } from './actionTypes';
import EditedItem from '../models/EditedItem';
import action from './action';

const storeEditedItemDescription = (id, description, isOriginal = false) => action(
  ITEM_STORE_EDITED_DESCRIPTION,
  {
    id,
    editedItem: new EditedItem({ description, isOriginal }),
  });

export default storeEditedItemDescription;
