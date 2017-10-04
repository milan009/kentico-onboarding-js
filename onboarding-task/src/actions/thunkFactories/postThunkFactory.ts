import * as uuidV4 from 'uuid';

import { emptyUuid, route } from '../../utils/constants';
import { postFailed, postStarted, postSucceeded } from '../actionCreators';

export const postNewItemFactory = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, optimisticUpdatedGenerator: () => string): (newText: string) => any => (
  (newText: string) =>
    function (dispatch: any) {
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
        .catch((error) => dispatch(postFailed(error)));

      /* dispatch(postStarted(newText));

      return fetch(route, options)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }
          return response.json();
        })
        .then((json) => {
          dispatch(postSucceeded(json));
          return json.id;
        })
        .then((id) => dispatch(createItemFactory(() => id)(newText)))
        .catch((error) => dispatch(postFailed(error)));*/
    });

const postNewItemWithFetchAPIAndUUIDV4 = postNewItemFactory(fetch, uuidV4);
export { postNewItemWithFetchAPIAndUUIDV4 as postNewItem };
