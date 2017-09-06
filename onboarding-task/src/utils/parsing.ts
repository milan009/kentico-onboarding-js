import { OrderedMap } from 'immutable';

import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { ItemData } from '../models/ItemData';

export const parseAPIResponseJson = (json: any): ItemsDataMap => {
  let parsedItems = OrderedMap<string, ItemData>();
  json.map((item: any) => {
    parsedItems = parsedItems.set(item.Id, new ItemData(
      {
        id: item.Id,
        text: item.Text
      }));
  });

  console.log(parsedItems);
  return parsedItems;
};

