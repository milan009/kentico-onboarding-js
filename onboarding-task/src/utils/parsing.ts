import { OrderedMap } from 'immutable';

import { ItemsDataMap } from '../reducers/list/itemsReducer';

export const parseAPIResponseJson = (json: any): ItemsDataMap => {
  const parsedItems = json.map((item: any) => {
    return {
      [item.Id]:
        {
          id: item.Id,
          text: item.Text
        }
    };
  });

  return OrderedMap(parsedItems);
};

