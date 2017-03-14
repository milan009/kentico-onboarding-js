import { Map, List } from 'immutable';

import { ItemRecord } from '../models/ItemRecord';
import { ItemUiPropsRecord } from '../models/ItemUiPropsRecord';

interface FetchedItem {
  id: string;
  text: string;
}

const convertGetAllResponse = (response: FetchedItem[]) => {
  const result = {
    byId: Map(),
    orderedIds: List(),
    uiPropsById: Map(),
    isFetching: false,
  };
  for (let i = 0; i < response.length; i++) {
    const itemRecord = new ItemRecord({ id: response[i].id, text: response[i].text });
    result.byId = result.byId.set(response[i].id, itemRecord);
    result.orderedIds = result.orderedIds.push(response[i].id);
    result.uiPropsById = result.uiPropsById.set(response[i].id, new ItemUiPropsRecord());
  }

  return result;
};

export { convertGetAllResponse };
