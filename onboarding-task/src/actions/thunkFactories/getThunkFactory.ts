import {
  fetchingFailed, fetchingSucceeded, parseItems,
  startFetchingItems
} from '../actionCreators';
import { route } from '../../utils/constants';

export const getItemsFactory = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>): () => any => (
  () =>
    function (dispatch: any) {
      dispatch(startFetchingItems());

      return fetch(route)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }
          return response.json();
        })
        .then((json) => (dispatch(parseItems(json))))
        .then((parsedItems) => dispatch(fetchingSucceeded(parsedItems)))
        .catch((error) => dispatch(fetchingFailed(error)));
    });

const getItemsWithFetchAPI = getItemsFactory(fetch);
export { getItemsWithFetchAPI as getItems }
