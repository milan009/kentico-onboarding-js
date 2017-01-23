import { ITEM_STORE_EDITED_DESCRIPTION } from './actionTypes';
import action from './action';

const storeEditedItemDescription = (id, description) => action(
  ITEM_STORE_EDITED_DESCRIPTION,
  {
    id,
    description,
  });

export default storeEditedItemDescription;
