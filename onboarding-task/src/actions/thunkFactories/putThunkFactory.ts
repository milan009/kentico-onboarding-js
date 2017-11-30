import { Dispatch } from 'redux';

import { ItemData } from '../../models/ItemData';
import { putFailed, putStarted, putSucceeded } from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';
import { fetchJsonResponse } from '../../utils/fetchJsonResponse';
import { IItemDTO } from '../../interfaces/IItemDTO';

type PutThunkActionFactory = (dependencies: IFactoryDependencies) => (item: ItemData) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  putThunkActionFactory: PutThunkActionFactory;
}

export const putSavedItemFactory: PutThunkActionFactory = (dependencies) =>
  (item: ItemData) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const options = {
      method: 'PUT',
      headers,
      body: JSON.stringify({id: item.id, text: item.text}),
    };
    const url = `${route}/${item.id}`;

    dispatch(putStarted(item));

    try {
      const json = await fetchJsonResponse<IItemDTO>({fetch: dependencies.fetch, input: url, init: options});
      return dispatch(putSucceeded(json));

    } catch (error) {
      return dispatch(putFailed(item.id, error, dependencies.putThunkActionFactory(dependencies)(item)));
    }
  };
