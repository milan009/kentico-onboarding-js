import { Dispatch } from 'redux';

import { parsingFinished, parsingStarted } from '../actionCreators';
import { parseAPIResponseJson } from '../../utils/parsing';
import { IItemDTO } from '../../interfaces/IItemDTO';
import { ItemsDataMap } from '../../reducers/list/itemsReducer';
import { IStore } from '../../interfaces/IStore';

export const parseItemsFactory = (parser: (json: IItemDTO[]) => Promise<ItemsDataMap>) => (json: IItemDTO[])  => {
  return function (dispatch: Dispatch<IStore>) {
    dispatch(parsingStarted(json));

    return parser(json)
      .then((parsedItems: any) => dispatch(parsingFinished(parsedItems)));
  };
};

const parseItemsWithResponseParser = parseItemsFactory(parseAPIResponseJson);
export { parseItemsWithResponseParser as parseItems }
