import { ITEM_UPDATE_DESCRIPTION } from './actionTypes';
import action from './action';

const updateItemDescription = (id, description) => action(
  ITEM_UPDATE_DESCRIPTION,
  {
    id,
    description,
  });

export default updateItemDescription;
