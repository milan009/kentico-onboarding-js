import { Dispatch } from 'redux';

import { ItemData } from '../../models/ItemData';
import { updateItemFailed, updateItemStarted, updateItemSucceeded } from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';
import { IItemDTO } from '../../interfaces/IItemDTO';

type IpdateItemThunkActionFactory = (dependencies: IFactoryDependencies) => (item: ItemData) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  putThunkActionFactory: IpdateItemThunkActionFactory;
}

export const updateItemThunkFactory: IpdateItemThunkActionFactory = (dependencies) =>
  (item: ItemData) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const options = {
      method: 'PUT',
      headers,
      body: JSON.stringify({id: item.id, text: item.text}),
    };
    const url = `${route}/${item.id}`;

    dispatch(updateItemStarted(item));

    try {
      const responseItem = await fetchJsonResponse<IItemDTO>({fetch: dependencies.fetch, input: url, init: options});
      return dispatch(updateItemSucceeded(responseItem));

    } catch (error) {
      return dispatch(updateItemFailed(item.id, error, dependencies.putThunkActionFactory(dependencies)(item)));
    }
  };
