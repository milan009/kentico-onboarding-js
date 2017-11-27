import { OrderedMap } from 'immutable';

import { ItemsDataMap } from '../reducers/list/itemsReducer';
import { ItemData } from '../models/ItemData';
import { IItemDTO } from '../interfaces/IItemDTO';

export const parseAPIResponseJson = (json: IItemDTO[]): Promise<ItemsDataMap> => {
  return new Promise<ItemsDataMap>((resolve) => {
    let parsedItems = OrderedMap<string, ItemData>();
    json.map((item: IItemDTO) => {
      parsedItems = parsedItems.set(item.id, new ItemData(item));
    });

    resolve(parsedItems);
  });
};
