import { ItemData } from '../../models/ItemData';
import { putFailed, putStarted, putSucceeded } from '../actionCreators';
import { route } from '../../utils/constants';
import { ThunkAction } from '../../interfaces/IAction';
import { Dispatch } from 'react-redux';
import { IStore } from '../../interfaces/IStore';

export type PutThunkActionFactory = (deps: IFactoryDependencies) => (item: ItemData) => ThunkAction;

interface IFactoryDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  putThunkActionFactory: PutThunkActionFactory;
}

export const putSavedItemFactory: PutThunkActionFactory = ({fetch, putThunkActionFactory}: IFactoryDependencies) =>
  (item: ItemData) => (
    function (dispatch: Dispatch<IStore>) {
      const headers = new Headers();
      headers.append('Content-type', 'Application/json');

      const options = {
        method: 'PUT',
        headers,
        body: JSON.stringify({id: item.id, text: item.text}),
      };

      dispatch(putStarted(item));

      return fetch(`${route}/${item.id}`, options)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }
          return response.json();
        })
        .then(
          (json) => {
            dispatch(putSucceeded(json));
            return json;
          })
        .catch((error) => {
          const deps: IFactoryDependencies = {
            fetch,
            putThunkActionFactory,
          };
          return dispatch(putFailed(item.id, error, putThunkActionFactory(deps)(item)));
        });
    });

const putSavedItemWithFetchAPI: (item: ItemData) => ThunkAction = putSavedItemFactory({
  fetch,
  putThunkActionFactory: putSavedItemFactory,
});
export { putSavedItemWithFetchAPI as putSavedItem }
