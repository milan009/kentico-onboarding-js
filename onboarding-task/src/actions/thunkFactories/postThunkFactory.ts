import { emptyUuid, route } from '../../utils/constants';
import { createItemFactory, postFailed, postStarted, postSucceeded } from '../actionCreators';

export const postNewItemFactory = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>): (newText: string) => any => (
  (newText: string) =>
    function (dispatch: any) {
      const headers = new Headers();
      headers.append('Content-type', 'Application/json');

      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({id: emptyUuid, text: newText}),
      };

      dispatch(postStarted(newText));

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
        .catch((error) => dispatch(postFailed(error)));
    });

const postNewItemWithFetchAPI = postNewItemFactory(fetch);
export { postNewItemWithFetchAPI as postNewItem };
