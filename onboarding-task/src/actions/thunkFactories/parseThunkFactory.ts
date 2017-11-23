import { Dispatch } from 'redux';

import { parsingFinished, parsingStarted } from '../actionCreators';
import { parseAPIResponseJson } from '../../utils/parsing';
import { IItemDTO } from '../../interfaces/IItemDTO';
import { ItemsDataMap } from '../../reducers/list/itemsReducer';
import { IStore } from '../../interfaces/IStore';
import { ThunkAction } from '../../interfaces/IAction';

export type ParseThunkActionFactory = (parser: (json: IItemDTO[]) => Promise<ItemsDataMap>) => (json: IItemDTO[]) => ThunkAction;

export const parseItemsFactory: ParseThunkActionFactory = (parser) =>
  (json: IItemDTO[]) => async (dispatch: Dispatch<IStore>) => {
    dispatch(parsingStarted(json));

    const parsedItems: ItemsDataMap = await parser(json);
    return dispatch(parsingFinished(parsedItems));
  };

const parseItemsWithResponseParser = parseItemsFactory(parseAPIResponseJson);
export { parseItemsWithResponseParser as parseItems }
