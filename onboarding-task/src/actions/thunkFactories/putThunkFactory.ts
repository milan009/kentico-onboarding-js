import { Dispatch } from 'react-redux';

import { ItemData } from '../../models/ItemData';
import { putFailed, putStarted, putSucceeded } from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

export type PutThunkActionFactory = (deps: IFactoryDependencies) => (item: ItemData) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  putThunkActionFactory: PutThunkActionFactory;
}

export const putSavedItemFactory: PutThunkActionFactory = ({fetch, putThunkActionFactory}: IFactoryDependencies) =>
  (item: ItemData) => async (dispatch: Dispatch<IStore>) => {
    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const options = {
      method: 'PUT',
      headers,
      body: JSON.stringify({id: item.id, text: item.text}),
    };

    dispatch(putStarted(item));

    try {
      const response = await fetch(`${route}/${item.id}`, options);

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      return dispatch(putSucceeded(json));

    } catch (error) {
      const deps: IFactoryDependencies = {
        fetch,
        putThunkActionFactory,
      };

      return dispatch(putFailed(item.id, error, putThunkActionFactory(deps)(item)));
    }
  };

const putSavedItemWithFetchAPI: (item: ItemData) => ThunkAction = putSavedItemFactory({
  fetch,
  putThunkActionFactory: putSavedItemFactory,
});
export { putSavedItemWithFetchAPI as putSavedItem }
