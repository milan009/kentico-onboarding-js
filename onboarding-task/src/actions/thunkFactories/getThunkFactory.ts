import {
  fetchingFailed, fetchingSucceeded, parseItems,
  startFetchingItems
} from '../actionCreators';
import { route } from '../../utils/constants';
import { Dispatch } from 'react-redux';
import { ThunkAction } from '../../interfaces/IAction';
import { IStore } from '../../interfaces/IStore';

export const getItemsFactory = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>): () =>
  ThunkAction => (
  () =>
    function (dispatch: Dispatch<IStore>) {
      dispatch(startFetchingItems());

      return fetch(route)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
          }

          return response.json();
        })
        .then((json) => dispatch(fetchingSucceeded(json)))
        .then((action) => dispatch(parseItems(action.payload.items)))
        .catch((error) => dispatch(fetchingFailed(error, getItemsFactory(fetch)())));
    });

const getItemsWithFetchAPI: () => ThunkAction = getItemsFactory(fetch);
export { getItemsWithFetchAPI as getItems }
