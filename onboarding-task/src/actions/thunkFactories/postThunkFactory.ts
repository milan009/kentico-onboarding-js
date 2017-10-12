import * as uuidV4 from 'uuid';

import { emptyUuid, route } from '../../utils/constants';
import { postFailed, postStarted, postSucceeded } from '../actionCreators';
import { ThunkAction } from '../../interfaces/IAction';
import { Dispatch } from 'react-redux';
import { IStore } from '../../interfaces/IStore';

export const postNewItemFactory = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, optimisticUpdatedGenerator: () => string): (newText: string) =>
  ThunkAction =>
  (newText: string) => (
    function (dispatch: Dispatch<IStore>) {
      const headers = new Headers();
      headers.append('Content-type', 'Application/json');

      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({id: emptyUuid, text: newText}),
      };

      const optimisticUpdateId = optimisticUpdatedGenerator();
      dispatch(postStarted(optimisticUpdateId, newText));

      return fetch(route, options)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }
          return response.json();
        })
        .then((json) => {
          dispatch(postSucceeded(optimisticUpdateId, json));
          return json.id;
        })
        .catch((error) => dispatch(postFailed(optimisticUpdateId, error, postNewItemFactory(fetch, uuidV4)(newText))));
    }
  );

const postNewItemWithFetchAPIAndUUIDV4: (newText: string) => ThunkAction
  = postNewItemFactory(fetch, uuidV4);
export { postNewItemWithFetchAPIAndUUIDV4 as postNewItem };
